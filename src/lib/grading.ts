import type { GradeResult, Question, UserAnswer } from "../types";
import { matches } from "./normalize";

export function grade(question: Question, answer: UserAnswer): GradeResult {
  const options = { caseSensitive: question.caseSensitive === true };
  switch (question.type) {
    case "blank": {
      if (answer.type !== "blank") return { correct: false };
      const blanks = question.blanks.map((accepted, i) =>
        matches(answer.values[i] ?? "", accepted, options),
      );
      return { correct: blanks.every(Boolean), blanks };
    }
    case "free":
      if (answer.type !== "free") return { correct: false };
      return { correct: matches(answer.value, question.answers, options) };
    case "mcq":
      if (answer.type !== "mcq") return { correct: false };
      return { correct: answer.choice === question.correct };
    case "truefalse":
      if (answer.type !== "truefalse") return { correct: false };
      return { correct: answer.value === question.answer };
    default:
      return assertNever(question);
  }
}

/** Texte lisible de la bonne réponse, affiché après correction. */
export function expectedAnswer(question: Question): string {
  switch (question.type) {
    case "blank":
      return question.blanks
        .map((accepted, i) =>
          question.blanks.length > 1 ? `(${i + 1}) ${accepted[0]}` : accepted[0],
        )
        .join("  ");
    case "free":
      return question.answers[0];
    case "mcq":
      return question.choices[question.correct] ?? "";
    case "truefalse":
      return question.answer ? "Vrai" : "Faux";
    default:
      return assertNever(question);
  }
}

/** Autres réponses acceptées (questions libres), pour information. */
export function alternativeAnswers(question: Question): string[] {
  return question.type === "free" ? question.answers.slice(1) : [];
}

/** Une réponse est-elle assez complète pour être validée ? */
export function isComplete(answer: UserAnswer | null): answer is UserAnswer {
  if (answer === null) return false;
  switch (answer.type) {
    case "blank":
      return answer.values.every((v) => v.trim() !== "");
    case "free":
      return answer.value.trim() !== "";
    case "mcq":
    case "truefalse":
      return true;
  }
}

export function assertNever(value: never): never {
  throw new Error(`Cas non géré : ${JSON.stringify(value)}`);
}

/** Réponse de l'utilisateur sous forme lisible (récapitulatif de fin de session). */
export function formatUserAnswer(question: Question, answer: UserAnswer): string {
  switch (answer.type) {
    case "blank":
      return answer.values
        .map((v, i) => (answer.values.length > 1 ? `(${i + 1}) ${v.trim() || "—"}` : v.trim() || "—"))
        .join("  ");
    case "free":
      return answer.value.trim() || "—";
    case "mcq":
      return question.type === "mcq" ? (question.choices[answer.choice] ?? "—") : "—";
    case "truefalse":
      return answer.value ? "Vrai" : "Faux";
  }
}
