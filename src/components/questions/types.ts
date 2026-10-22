import type { GradeResult, Question, UserAnswer } from "../../types";

export interface AnswerInputProps<Q extends Question> {
  question: Q;
  answer: UserAnswer | null;
  onChange: (answer: UserAnswer) => void;
  /** Résultat après validation (null tant que l'utilisateur répond). */
  result: GradeResult | null;
  onSubmit: () => void;
}
