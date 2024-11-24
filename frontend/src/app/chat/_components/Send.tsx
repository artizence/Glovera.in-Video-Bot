import { Dispatch, SetStateAction } from "react";
import { questions } from "../questions";

type Prop = {
  setQuestion: Dispatch<SetStateAction<number>>;
  text: string;
  setDisableButton: Dispatch<SetStateAction<boolean>>
  disabledButton: boolean;
};

export function Send({ setQuestion, text, setDisableButton, disabledButton }: Prop) {
  return (
    <button
      disabled={disabledButton}
      className="btn btn-primary"
      onClick={() => {
        setQuestion((val) => {
          console.log(val)
          localStorage.setItem(questions[val].name, text);
          return val + 1
        })
        setDisableButton(true)
      }}
    >
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
  );
}
