"use server";

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
