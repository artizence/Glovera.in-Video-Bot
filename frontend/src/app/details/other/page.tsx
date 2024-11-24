"use client";

import { useRouter } from "next/navigation";
import { saveStudent, saveToLocalStorage } from "../_lib";

function Details() {
  const router = useRouter();
  const data = [
    {
      question: "Email",
      type: "email",
      class: "input input-bordered",
      placeholder: "123@gm.com",
      name: "email",
    },
    {
      question: "Program Looking For",
      type: "text",
      class: "input input-bordered",
      placeholder: "Program Name",
      name: "program_looking_for",
    },
    {
      question: "Education Qualification",
      type: "text",
      class: "input input-bordered",
      placeholder: "Qualifications",
      name: "education_qualification",
    },
  ];

  const handleSubmit = async (data: FormData) => {
    saveToLocalStorage("basic-details", data);
    await saveStudent();
    router.push("/chat");
  };

  return (
    <>
      <ul className="steps w-full max-w-sm">
        <li className={`step step-primary`}>Personal Details</li>
        <li className={`step step-primary`}>Other Details</li>
      </ul>
      <div className="max-w-md w-full">
        <form action={handleSubmit}>
          {data.map((value, idx) => (
            <div key={idx} className="mb-3">
              <label className="label label-text"> {value.question} </label>
              <input
                required
                name={value.name}
                type={value.type}
                className={`${value.class} w-full`}
                placeholder={value.placeholder}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-full">
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default Details;
