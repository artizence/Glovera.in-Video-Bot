"use client";

import StreamingAvatar from "@heygen/streaming-avatar";
import { useEffect, useRef, useState } from "react";
import { createChatBot, speak } from "./_lib";
import { Error, Loading, Send } from "./_components";
import dynamic from "next/dynamic";
import Link from "next/link";
import { questions } from "./questions";

const Mic = dynamic(() => import("./_components/Microphone"), { ssr: false });

function ChatBot() {
  const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);
  const [stream, setStream] = useState(null);
  const video = useRef<HTMLVideoElement>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputText, setInputText] = useState("");
  const [connected, setConnection] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    return () => {
      avatar?.stopAvatar();
    };
  }, []);

  useEffect(() => {
    if (currentQuestionIdx >= questions.length) {
      speak(avatar, "We are evaluating your results.");
      submitForm()
      return;
    }

    speak(avatar, questions[currentQuestionIdx].question);
  }, [currentQuestionIdx]);

  const submitForm = () => {
    type obj = {
      [key: string]: string
  }
    const data : obj = {}
    questions.forEach((el) => {
      data[el.name] = localStorage.getItem(el.name)!
    })

  }

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
                setButtonDisabled,
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
            <Send
              text={inputText}
              setQuestion={setCurrentQuestionIdx}
              setDisableButton={setButtonDisabled}
              disabledButton={buttonDisabled}
            />
            <Mic
              setQuestion={setCurrentQuestionIdx}
              setDisableButton={setButtonDisabled}
              disabledButton={buttonDisabled}
            />
          </>
        )}
      </div>
      <Link href={"/test"} className="btn btn-accent absolute left-2 top-2">
        Test our ai bot
      </Link>
    </main>
  );
}

export default ChatBot;
