import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import { getAccessToken } from "./api";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setAvatar: Dispatch<SetStateAction<StreamingAvatar | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setStream: Dispatch<SetStateAction<null>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setConnection: Dispatch<SetStateAction<boolean>>;
};

export async function createChatBot({
  setAvatar,
  setError,
  setLoading,
  setStream,
  setConnection,
}: Props) {
  setLoading(true)
  const access_token = await getAccessToken();
  const streamingAvatar = new StreamingAvatar({
    token: access_token,
  });
  const avatarIds = ["Briana_public_3_20240110", "Kristin_public_2_20240108"]

  streamingAvatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
    streamingAvatar.stopAvatar();
  });
  streamingAvatar.on(StreamingEvents.STREAM_READY, (event) => {
    setConnection(true)
    setLoading(false);
    setStream(event.detail);
  });
  streamingAvatar.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
    console.log(e)
  })

  try {
    const sessionData = await streamingAvatar.createStartAvatar({
      quality: AvatarQuality.High,
      avatarName: avatarIds[0],
      voice: {
        rate: 1.5,
        emotion: VoiceEmotion.EXCITED,
      },
    });
    console.log(sessionData)
  } catch (err) {
    console.log(err)
    setError(true);
  }

  setAvatar(streamingAvatar);
}


export async function speak(avatar : StreamingAvatar | null, text : string) {
  await avatar?.speak({ text : text, task_type: TaskType.REPEAT, taskMode : TaskMode.SYNC })
}