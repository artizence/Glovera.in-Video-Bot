import { login } from "../_lib";

function Login() {
  const data = [
    {
      question: "Email",
      type: "text",
      class: "input input-bordered",
      placeholder: "abcd@gmail.com",
    },
    {
      question: "Password",
      type: "password",
      class: "input input-bordered",
      placeholder: "************",
    },
  ];

  return (
    <>
      <ul className="steps w-full max-w-sm">
        <li className={`step step-primary`}>Sign up</li>
        <li className={`step step-primary`}>Login</li>
        <li className={`step`}>Details</li>
      </ul>
      <div className="max-w-md w-full">
        <form action={login}>
          {data.map((value, idx) => (
            <div key={idx} className="mb-3">
              <label className="label label-text"> {value.question} </label>
              <input
                name={value.question.toLowerCase()}
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

export default Login;
