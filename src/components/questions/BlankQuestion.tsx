import type { KeyboardEvent } from "react";
import type { BlankQuestion as BlankQ } from "../../types";
import { CodeBlock } from "../CodeBlock";
import { answerInputProps, keepVisibleOnFocus } from "../focus";
import type { AnswerInputProps } from "./types";

export function BlankQuestion({ question, answer, onChange, result, onSubmit }: AnswerInputProps<BlankQ>) {
  const values = answer?.type === "blank" ? answer.values : question.blanks.map(() => "");
  const last = question.blanks.length - 1;

  function update(index: number, value: string) {
    onChange({ type: "blank", values: values.map((v, i) => (i === index ? value : v)) });
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (index < last) {
      document.getElementById(`${question.id}-blank-${index + 1}`)?.focus();
    } else {
      onSubmit();
    }
  }

  return (
    <CodeBlock
      source={question.template}
      lang={question.lang}
      renderSlot={(index) => {
        const value = values[index] ?? "";
        const state = result?.blanks?.[index];
        return (
          <input
            id={`${question.id}-blank-${index}`}
            className={`blank-input${state === true ? " is-correct" : state === false ? " is-wrong" : ""}`}
            style={{ width: `${Math.max(5, value.length + 2)}ch` }}
            value={value}
            onChange={(e) => update(index, e.target.value)}
            onFocus={keepVisibleOnFocus}
            onKeyDown={(e) => onKeyDown(e, index)}
            disabled={result !== null}
            aria-label={`Trou ${index + 1} sur ${question.blanks.length}`}
            enterKeyHint={index < last ? "next" : "done"}
            {...answerInputProps}
          />
        );
      }}
    />
  );
}
