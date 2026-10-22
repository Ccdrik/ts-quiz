import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: "bases-01",
    theme: "bases",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement:
      "Un tableau déclaré avec `const` peut quand même être modifié, par exemple avec `push`.",
    code: { source: 'const scores = [10, 12];\nscores.push(15);' },
    answer: true,
    explanation:
      "`const` interdit la réaffectation de la variable, pas la modification de l'objet qu'elle référence. Pour un tableau non modifiable, utilise `readonly` ou `as const`.",
    example: "const scores: readonly number[] = [10, 12];\n// @ts-expect-error push n'existe pas sur readonly number[]\nscores.push(15);",
    glossary: ["constante", "mutabilite"],
  },
  {
    id: "bases-02",
    theme: "bases",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: { source: "const total = 0;\ntotal = 5;" },
    choices: [
      "On ne peut pas réaffecter une constante",
      "0 n'est pas un `number` valide",
      "Il faut écrire `const total = 5` à la deuxième ligne",
      "Une variable doit toujours être annotée",
    ],
    correct: 0,
    explanation:
      "Une variable déclarée avec `const` ne peut pas être réaffectée. Si la valeur doit changer, déclare-la avec `let`.",
    example: "let total = 0;\ntotal = 5; // ✅",
    glossary: ["constante", "reaffectation"],
  },
  {
    id: "bases-03",
    theme: "bases",
    format: "inference",
    type: "free",
    prompt: "Quel est le type inféré de `salut` ?",
    code: { source: 'const salut = "Bonjour";' },
    answers: ['"Bonjour"'],
    explanation:
      "Une `const` ne pourra jamais changer : TypeScript infère le type littéral `\"Bonjour\"`, plus précis que `string`. Avec `let`, le type serait élargi à `string`.",
    example: 'let salut = "Bonjour"; // type : string',
    glossary: ["constante", "type-litteral"],
  },
];
