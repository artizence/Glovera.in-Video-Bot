"use client"

import { useRouter } from "next/navigation";
import { saveToLocalStorage } from "../_lib";

function Details() {
  const router = useRouter()
  const data = [
    {
      question: "First name",
      type: "text",
      class: "input input-bordered",
      placeholder: "Full name",
      name: "first_name"
    },
    {
      question: "Last name",
      type: "text",
      class: "input input-bordered",
      placeholder: "Last Name",
      name: "last_name"
    },
    {
      question: "Father's Name",
      type: "text",
      class: "input input-bordered",
      placeholder: "Father's Name",
      name: "father_name"
    },
    {
      question: "Date of birth",
      type: "date",
      class: "input input-bordered",
      placeholder: "Enter your email",
      name: "date_of_birth"
    },
  ];

  const handleSubmit = (data: FormData) => {
    saveToLocalStorage("basic-details", data)
    router.push("/details/other")
  }

  return (
    <>
      <ul className="steps w-full max-w-sm">
        <li className={`step step-primary`}>Personal Details</li>
        <li className={`step`}>Other Details</li>
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
