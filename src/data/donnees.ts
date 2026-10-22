import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: "donnees-01",
    theme: "donnees",
    format: "inference",
    type: "free",
    prompt: "Quel est le type inféré de `point` ?",
    code: { source: "const point = [10, 20];" },
    answers: ["number[]", "Array<number>"],
    explanation:
      "Sans annotation, TypeScript infère un tableau de nombres `number[]`, pas un tuple. Pour un tuple, il faut annoter ou utiliser `as const`.",
    example: "const point: [number, number] = [10, 20];",
    glossary: ["tableau", "tuple"],
  },
  {
    id: "donnees-02",
    theme: "donnees",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Après ce code, le tableau `prix` contient les prix TTC.",
    code: { source: "const prix = [10, 20];\nconst ttc = prix.map((p) => p * 1.2);" },
    answer: false,
    explanation:
      "`map` ne modifie pas le tableau d'origine : il renvoie un nouveau tableau. `prix` vaut toujours `[10, 20]` et `ttc` contient les nouveaux prix.",
    glossary: ["map", "tableau"],
  },
  {
    id: "donnees-03",
    theme: "donnees",
    format: "notion",
    type: "blank",
    prompt: "Complète le tuple : une latitude puis un nom de ville.",
    template: 'const lieu: [{{0}}, {{1}}] = [48.85, "Paris"];',
    blanks: [["number"], ["string"]],
    explanation:
      "Un tuple est un tableau de longueur fixe où chaque position a son propre type.",
    example: 'const lieu: [number, string] = [48.85, "Paris"];\nconst ville = lieu[1]; // string',
    glossary: ["tuple"],
  },
];
