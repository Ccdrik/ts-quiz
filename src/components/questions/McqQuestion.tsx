import { useMemo } from "react";
import { shuffle } from "../../lib/session";
import type { McqQuestion as McqQ } from "../../types";
import { RichText } from "../RichText";
import type { AnswerInputProps } from "./types";

export function McqQuestion({ question, answer, onChange, result }: AnswerInputProps<McqQ>) {
  // Ordre des choix mélangé une fois par question ; la réponse garde l'index d'origine.
  const order = useMemo(() => shuffle(question.choices.map((_, i) => i)), [question]);
  const selected = answer?.type === "mcq" ? answer.choice : null;

  return (
    <div className="choices" role="radiogroup" aria-label="Choix de réponse">
      {order.map((index) => {
        let state = "";
        if (result !== null) {
          if (index === question.correct) state = " is-correct";
          else if (index === selected) state = " is-wrong";
        } else if (index === selected) {
          state = " is-selected";
        }
        return (
          <button
            key={index}
            type="button"
            role="radio"
            aria-checked={index === selected}
            className={`choice${state}`}
            onClick={() => onChange({ type: "mcq", choice: index })}
            disabled={result !== null}
          >
            <RichText text={question.choices[index] ?? ""} />
          </button>
        );
      })}
    </div>
  );
}
