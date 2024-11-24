"use client";
import StreamingAvatar from "@heygen/streaming-avatar";
import { useReactMediaRecorder } from "react-media-recorder";
import { speak, transcribeAudio } from "../_lib";

type Prop = {
  avatar: StreamingAvatar | null;
  text: string;
};

export default function Mic({avatar}: Prop) {
  const onStopRecording = async (blobUrl: string, blob: Blob) => {
    const text = await transcribeAudio(blob)
    speak(avatar, text)
  };

  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    video: false,
    onStop: onStopRecording,
  });

  const toggleRecording = () => {
    if (status === "recording") stopRecording();
    else startRecording();
  };

  return (
    <label
      className={`btn ${
        status === "recording" ? "btn-primary" : "btn-neutral"
      } swap`}
    >
      <input type="checkbox" onChange={toggleRecording} />
      {status !== "recording" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-mic-mute-fill"
          viewBox="0 0 16 16"
        >
          <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3" />
          <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-mic-fill"
          viewBox="0 0 16 16"
        >
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
        </svg>
      )}
    </label>
  );
}
