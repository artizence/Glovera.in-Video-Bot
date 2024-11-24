import { Mic } from "./_components";

function Page() {
  return (
    <main className="flex flex-col h-dvh overflow-hidden">
      <div className="flex-1"></div>
      <div className="flex w-full p-6 gap-1">
        <input
          type="text"
          className="input input-bordered grow"
          placeholder="Enter your prompt..."
        />
        <div className="flex gap-1">
          <button className="btn btn-primary btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
            </svg>
          </button>
          <Mic />
        </div>
      </div>
    </main>
  );
}

export default Page;
