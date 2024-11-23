"use client";

import StreamingAvatar from "@heygen/streaming-avatar";
import { useEffect, useRef, useState } from "react";
import { createChatBot, speak } from "./_lib";
import { Error, Loading } from "./_components";

function ChatBot() {
  const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);
  const [stream, setStream] = useState(null);
  const video = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    createChatBot({
      setAvatar,
      setError,
      setLoading,
      setStream,
    });
    return () => {
      avatar?.stopAvatar();
    };
  }, []);

  useEffect(() => {
    if (!stream || !video.current) return;
    video.current.srcObject = stream;
    video.current.onloadedmetadata = async () => {
      setLoading(false);
      video.current!.play();
    };
  }, [stream, video]);

  if (error) return <Error />;
  if (loading) return <Loading />;

  return (
    <main>
      <div className="w-full h-screen flex justify-center">
        <video ref={video} className="h-screen"></video>
      </div>
      <div className="flex gap-4 absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
        <input type="text" className="input input-bordered w-full" onChange={(e) => { setInputText(e.target.value) }} />
        <button className="btn btn-primary" onClick={() => { speak(avatar, inputText) }}>send</button>
        <button className="btn btn-primary">mic</button>
      </div>
    </main>
  );
}

export default ChatBot;
