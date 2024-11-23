import { startBot } from "./_lib";

function Details() {
  const data = [
    {
      question: "What's your name?",
      type: "text",
      class: "input input-bordered",
      placeholder: "Full name",
    },
    {
      question: "What's your highest qualification?",
      type: "text",
      class: "input input-bordered",
      placeholder: "Qualification",
    },
    {
      question: "What you aspire to be?",
      type: "text",
      class: "input input-bordered",
      placeholder: "Aim",
    },
  ];
  return (
    <>
      <ul className="steps w-full max-w-sm">
        <li className={`step step-primary`}>Sign up</li>
        <li className={`step step-primary`}>Login</li>
        <li className={`step step-primary`}>Details</li>
      </ul>
      <div className="max-w-md w-full">
        <form action={startBot}>
          {data.map((value, idx) => (
            <div key={idx} className="mb-3">
              <label className="label label-text"> {value.question} </label>
              <input
                type={value.question}
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
