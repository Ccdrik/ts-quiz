import type { FreeQuestion as FreeQ } from "../../types";
import { answerInputProps, keepVisibleOnFocus } from "../focus";
import type { AnswerInputProps } from "./types";

export function FreeQuestion({ question, answer, onChange, result, onSubmit }: AnswerInputProps<FreeQ>) {
  const value = answer?.type === "free" ? answer.value : "";
  const state = result === null ? "" : result.correct ? " is-correct" : " is-wrong";
  return (
    <input
      id={`${question.id}-free`}
      className={`free-input${state}`}
      value={value}
      placeholder="Ta réponse…"
      onChange={(e) => onChange({ type: "free", value: e.target.value })}
      onFocus={keepVisibleOnFocus}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}
      disabled={result !== null}
      aria-label="Ta réponse"
      enterKeyHint="done"
      {...answerInputProps}
    />
  );
}
