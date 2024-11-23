"use client";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import { useEffect, useState } from "react";
import { getAccessToken } from "./_lib";

function ChatBot() {
  const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);

  const startChatCreation = async () => {
    const access_token = await getAccessToken();
    const streamingAvatar = new StreamingAvatar({
      token: access_token,
    });

    streamingAvatar.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
      console.log(e);
    });
    streamingAvatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      console.log("disconnected");
    });
    streamingAvatar.on(StreamingEvents.STREAM_READY, (event) => {
      console.log(event);
    });

    const sessionInfo = await streamingAvatar.createStartAvatar({
      quality: AvatarQuality.Medium,
      avatarName: "Georgia",
    //   avatarId: "1727672614",
    //   voice: {
    //     rate: 1.5,
    //     emotion: VoiceEmotion.EXCITED,
    //   },
    });
    setAvatar(streamingAvatar);
  };

  useEffect(() => {
    startChatCreation();

    // () => {
    //   avatar?.closeVoiceChat();
    // };
  }, []);

  return (
    <main>
      <div className="w-full h-screen">
        <video
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        ></video>
      </div>
      <div className="flex gap-4 absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
        <input type="text" className="input input-bordered w-full" />
        <button className="btn btn-primary">send</button>
        <button className="btn btn-primary">mic</button>
      </div>
    </main>
  );
}

export default ChatBot;
