import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: "fonctions-01",
    theme: "fonctions",
    format: "notion",
    type: "blank",
    prompt: "Complète la signature : la fonction additionne deux nombres.",
    template: "function add(a: {{0}}, b: number): {{1}} {\n  return a + b;\n}",
    blanks: [["number"], ["number"]],
    explanation:
      "Les deux paramètres sont des `number`, donc leur somme aussi : le type de retour est `number`.",
    example: "const somme: number = add(2, 3);\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}",
    glossary: ["parametre", "type-de-retour"],
  },
  {
    id: "fonctions-02",
    theme: "fonctions",
    format: "nommer",
    type: "free",
    prompt: "Comment s'appelle l'élément surligné ?",
    code: { source: "function saluer([[nom]]: string) {\n  return `Salut ${nom}`;\n}" },
    answers: ["paramètre", "un paramètre", "parametre de fonction"],
    explanation:
      "Dans la déclaration, `nom` est un paramètre : une variable qui recevra la valeur passée à l'appel. La valeur passée à l'appel s'appelle l'argument.",
    example: 'function saluer(nom: string) {} // nom : paramètre\nsaluer("Léa"); // "Léa" : argument',
    glossary: ["parametre", "argument"],
  },
  {
    id: "fonctions-03",
    theme: "fonctions",
    format: "inference",
    type: "mcq",
    prompt: "Quel est le type inféré de `double` ?",
    code: { source: "const double = (n: number) => n * 2;" },
    choices: ["(n: number) => number", "number", "Function", "(n: number) => void"],
    correct: 0,
    explanation:
      "`double` contient une fonction fléchée : son type est une signature de fonction. Le type de retour `number` est inféré à partir de `n * 2`.",
    glossary: ["fonction-flechee", "type-de-retour"],
  },
];
