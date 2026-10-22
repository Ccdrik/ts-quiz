import type { TrueFalseQuestion as TrueFalseQ } from "../../types";
import { RichText } from "../RichText";
import type { AnswerInputProps } from "./types";

const OPTIONS = [
  { value: true, label: "Vrai" },
  { value: false, label: "Faux" },
] as const;

export function TrueFalseQuestion({ question, answer, onChange, result }: AnswerInputProps<TrueFalseQ>) {
  const selected = answer?.type === "truefalse" ? answer.value : null;
  return (
    <>
      <blockquote className="statement">
        <RichText text={question.statement} />
      </blockquote>
      <div className="choices choices-row" role="radiogroup" aria-label="Vrai ou faux">
        {OPTIONS.map(({ value, label }) => {
          let state = "";
          if (result !== null) {
            if (value === question.answer) state = " is-correct";
            else if (value === selected) state = " is-wrong";
          } else if (value === selected) {
            state = " is-selected";
          }
          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={value === selected}
              className={`choice choice-center${state}`}
              onClick={() => onChange({ type: "truefalse", value })}
              disabled={result !== null}
            >
              {label}
            </button>
          );
        })}
      </div>
    </>
  );
}
