import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: "generiques-01",
    theme: "generiques",
    format: "notion",
    type: "blank",
    prompt: "Complète le paramètre de type de cette fonction générique.",
    template:
      "function premier<{{0}}>(liste: T[]): T | undefined {\n  return liste[0];\n}",
    blanks: [["T"]],
    caseSensitive: true,
    explanation:
      "`<T>` déclare un paramètre de type : `T` sera remplacé par le type réel à chaque appel. `premier([1, 2])` renvoie un `number | undefined`.",
    example: "function premier<T>(liste: T[]): T | undefined {\n  return liste[0];\n}\nconst n = premier([1, 2]); // number | undefined",
    glossary: ["generique"],
  },
  {
    id: "generiques-02",
    theme: "generiques",
    format: "inference",
    type: "free",
    prompt: "Que vaut le type `R` ?",
    code: { source: "type R = ReturnType<() => Promise<number>>;" },
    answers: ["Promise<number>"],
    caseSensitive: true,
    explanation:
      "`ReturnType<F>` extrait le type de retour d'un type fonction. Pour obtenir `number`, il faudrait en plus `Awaited<R>`.",
    example: "type R = ReturnType<() => Promise<number>>; // Promise<number>\ntype V = Awaited<R>; // number",
    glossary: ["utility-types"],
  },
  {
    id: "generiques-03",
    theme: "generiques",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: { source: "function longueur<T>(x: T): number {\n  return x.length;\n}" },
    choices: [
      "`T` n'a pas de contrainte : rien ne garantit qu'il possède `length`",
      "Une fonction générique ne peut pas renvoyer `number`",
      "Il faut écrire `T.length`",
    ],
    correct: 0,
    explanation:
      "Sans contrainte, `T` peut être n'importe quel type. On ajoute une contrainte avec `extends` pour garantir la propriété.",
    example: "function longueur<T extends { length: number }>(x: T): number {\n  return x.length;\n}",
    glossary: ["contrainte", "generique"],
  },
];
