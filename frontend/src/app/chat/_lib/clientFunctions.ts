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
  setStream: Dispatch<SetStateAction<any | null>>;
  setError: Dispatch<SetStateAction<boolean>>;
};

export async function createChatBot({
  setAvatar,
  setError,
  setLoading,
  setStream,
}: Props) {
  const access_token = await getAccessToken();
  const streamingAvatar = new StreamingAvatar({
    token: access_token,
  });

  streamingAvatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
    streamingAvatar.stopAvatar();
  });
  streamingAvatar.on(StreamingEvents.STREAM_READY, (event) => {
    setLoading(false);
    setStream(event.detail);
  });
  streamingAvatar.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
    console.log(e)
  })

  try {
    const sessionData = await streamingAvatar.createStartAvatar({
      quality: AvatarQuality.High,
      avatarName: "Anna_public_3_20240108",
      voice: {
        rate: 1.5,
        emotion: VoiceEmotion.EXCITED,
      },
    });
  } catch (err) {
    setError(true);
  }

  setAvatar(streamingAvatar);
}


export async function speak(avatar : StreamingAvatar | null, text : string) {
  await avatar?.speak({ text : text, task_type: TaskType.REPEAT, taskMode : TaskMode.SYNC })
}