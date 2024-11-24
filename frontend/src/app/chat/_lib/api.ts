"use server";

import OpenAI, { toFile } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function getAccessToken(): Promise<string> {
  const API_KEY = process.env.HEYGEN_API_KEY;
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
    language: "en",
  });
  console.log(response);
  return response.text;
}

const postData = async (url: string, data: object) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const responseData = await response.json();
    console.log(
      `Request to ${url} succeeded with status ${response.status}`,
      responseData
    );
  } catch (error) {
    // @ts-expect-error explicit
    console.error(`Error posting to ${url}:`, error.message);
  }
};

export async function saveProgram() {
  const programData : object = {
    name: "Computer Science",
    level: "Bachelors",
    min_fee: 5000.0,
    scholarship: true,
    scholarship_details: "Available for top 10% students",
    qualification_required: "High School Diploma",
    location: "New York",
    time_span: "04 06:00:00", // ISO 8601 duration format for 2 years
    total_fee: 20000.0,
    is_active: true,
    currently_in_program: 150,
    visa_requirements: "Student Visa required",
    pros_and_cons: "Pros: Great faculty, Cons: Expensive",
    one_line_description: "A comprehensive program in Computer Science",
  };

  postData(`${process.env.BASE_URL}/programs/`, programData);
}
