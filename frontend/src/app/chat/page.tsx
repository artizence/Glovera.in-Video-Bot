"use client";

import StreamingAvatar from "@heygen/streaming-avatar";
import { useEffect, useRef, useState } from "react";
import { createChatBot } from "./_lib";
import { Error, Loading, Send } from "./_components";
import dynamic from "next/dynamic";

const Mic = dynamic(() => import("./_components/Microphone"), { ssr: false });

function ChatBot() {
  const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);
  const [stream, setStream] = useState(null);
  const video = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputText, setInputText] = useState("");
  const [connected, setConnection] = useState(false);

  useEffect(() => {
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
        <video ref={video} autoPlay className="h-screen"></video>
      </div>
      <div className="flex gap-4 absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
        {connected === false ? (
          <button
            className="btn btn-primary w-full"
            onClick={() => {
              setConnection(true);
              createChatBot({
                setAvatar,
                setError,
                setLoading,
                setStream,
                setConnection,
              });
            }}
          >
            Connect
          </button>
        ) : (
          <>
            <input
              type="text"
              className="input input-bordered w-full"
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              placeholder="Message..."
            />
            <Send avatar={avatar} text={inputText} />
            <Mic avatar={avatar} text={inputText} />
          </>
        )}
      </div>
    </main>
  );
}

export default ChatBot;
