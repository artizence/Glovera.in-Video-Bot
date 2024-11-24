"use server";

import OpenAI, { toFile } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
})

export async function getAccessToken(): Promise<string> {
    const API_KEY = process.env.HEYGEN_API_KEY
  try {
    if (!API_KEY) {
      throw new Error("API key is missing from .env");
    }

    const res = await fetch(
      "https://api.heygen.com/v1/streaming.create_token",
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    const data = await res.json();
    return data.data.token;
  } catch (error) {
    console.error("Error retrieving access token:", error);
    throw new Error("F/ailed to retrive access token");
  }
}


export async function transcribeAudio(data: Blob): Promise<string> {
  const response = await openai.audio.transcriptions.create({
    file: await toFile(data),
    model: "whisper-1",
    language: "en"
  })
  console.log(response)
  return response.text
}