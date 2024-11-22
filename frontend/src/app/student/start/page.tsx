function StartBot() {
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
    <main className="flex justify-center items-center w-full h-full bg-base-200 px-5">
      <div className="max-w-md w-full">
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
        <button className="btn btn-primary w-full">Continue</button>
      </div>
    </main>
  );
}

export default StartBot;
