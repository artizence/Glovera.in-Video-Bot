"use server";
import { redirect } from "next/navigation";

export async function startBot(data: FormData) {
  console.log(data);
  redirect("/chat");
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

export async function saveStudent() {
  const studentData: object = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    date_of_birth: "2000-01-01",
    program: 1, // Assuming the program ID is 1
    education_qualification: "High School Diploma",
    subjects_studied: "Math, Physics, Computer Science",
    countries_looking_to_study: "USA, Canada",
    program_looking_for: "Computer Science",
    address: "123 Main St, New York, NY",
    phone_number: "1234567890",
    nationality: "American",
    passport_number: "A12345678",
    previous_institutions: "XYZ High School",
    extracurricular_activities: "Basketball, Chess",
    personal_statement: "I am passionate about technology and innovation.",
  };

  postData(`${process.env.BASE_URL}/students/`, studentData);
}
