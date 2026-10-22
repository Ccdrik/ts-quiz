import { describe, expect, it } from "vitest";
import type { Question } from "../types";
import { expectedAnswer, grade, isComplete } from "./grading";

const base = {
  theme: "bases",
  format: "notion",
  prompt: "?",
  explanation: "",
  glossary: [] as string[],
} satisfies Partial<Question>;

const blank: Question = {
  ...base,
  id: "t-blank",
  type: "blank",
  template: "function add(a: {{0}}, b: number): {{1}} {}",
  blanks: [["number"], ["number", "Number"]],
};
const free: Question = { ...base, id: "t-free", type: "free", answers: ["readonly", "le mot-clé readonly"] };
const mcq: Question = { ...base, id: "t-mcq", type: "mcq", choices: ["a", "b", "c"], correct: 2 };
const tf: Question = { ...base, id: "t-tf", type: "truefalse", statement: "?", answer: false };
const strict: Question = { ...base, id: "t-cs", type: "free", answers: ["T"], caseSensitive: true };

describe("grade", () => {
  it("texte à trous : tous les trous justes", () => {
    expect(grade(blank, { type: "blank", values: [" Number ", "number;"] })).toEqual({
      correct: true,
      blanks: [true, true],
    });
  });

  it("texte à trous : un trou faux", () => {
    expect(grade(blank, { type: "blank", values: ["number", "string"] })).toEqual({
      correct: false,
      blanks: [true, false],
    });
  });

  it("texte à trous : trou manquant", () => {
    expect(grade(blank, { type: "blank", values: ["number"] }).correct).toBe(false);
  });

  it("réponse libre avec plusieurs réponses acceptées", () => {
    expect(grade(free, { type: "free", value: "Readonly" }).correct).toBe(true);
    expect(grade(free, { type: "free", value: "le  mot-clé readonly ;" }).correct).toBe(true);
    expect(grade(free, { type: "free", value: "const" }).correct).toBe(false);
  });

  it("réponse libre sensible à la casse", () => {
    expect(grade(strict, { type: "free", value: "t" }).correct).toBe(false);
    expect(grade(strict, { type: "free", value: " T " }).correct).toBe(true);
  });

  it("QCM", () => {
    expect(grade(mcq, { type: "mcq", choice: 2 }).correct).toBe(true);
    expect(grade(mcq, { type: "mcq", choice: 0 }).correct).toBe(false);
  });

  it("vrai / faux", () => {
    expect(grade(tf, { type: "truefalse", value: false }).correct).toBe(true);
    expect(grade(tf, { type: "truefalse", value: true }).correct).toBe(false);
  });

  it("une réponse du mauvais type est fausse", () => {
    expect(grade(mcq, { type: "free", value: "c" }).correct).toBe(false);
  });
});

describe("expectedAnswer", () => {
  it("affiche la bonne réponse selon le type", () => {
    expect(expectedAnswer(blank)).toBe("(1) number  (2) number");
    expect(expectedAnswer(free)).toBe("readonly");
    expect(expectedAnswer(mcq)).toBe("c");
    expect(expectedAnswer(tf)).toBe("Faux");
  });
});

describe("isComplete", () => {
  it("exige une saisie non vide", () => {
    expect(isComplete(null)).toBe(false);
    expect(isComplete({ type: "free", value: "  " })).toBe(false);
    expect(isComplete({ type: "blank", values: ["a", ""] })).toBe(false);
    expect(isComplete({ type: "blank", values: ["a", "b"] })).toBe(true);
    expect(isComplete({ type: "truefalse", value: false })).toBe(true);
  });
});
