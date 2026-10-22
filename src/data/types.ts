import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: "types-01",
    theme: "types",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: { source: "function longueur(x: unknown) {\n  return x.length;\n}" },
    choices: [
      "`x` est `unknown` : il faut d'abord vérifier son type (narrowing)",
      "`length` n'existe pas en TypeScript",
      "Il manque le type de retour",
      "`unknown` n'est pas un type valide",
    ],
    correct: 0,
    explanation:
      "`unknown` accepte n'importe quelle valeur mais interdit toute utilisation tant qu'on n'a pas restreint son type, contrairement à `any`.",
    example:
      'function longueur(x: unknown) {\n  if (typeof x === "string") return x.length;\n  return 0;\n}',
    glossary: ["unknown", "any", "narrowing"],
  },
  {
    id: "types-02",
    theme: "types",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement:
      "On peut tester à l'exécution si un objet respecte une interface avec `typeof objet === \"User\"`.",
    answer: false,
    explanation:
      "Les types TypeScript disparaissent à la compilation : il n'existe plus d'interface à l'exécution. On vérifie plutôt la présence de propriétés avec `in` ou un type guard.",
    example:
      'interface User { nom: string }\nfunction estUser(x: object): x is User {\n  return "nom" in x;\n}',
    glossary: ["narrowing"],
  },
  {
    id: "types-03",
    theme: "types",
    format: "notion",
    type: "blank",
    prompt: "Complète pour restreindre le type de `v`.",
    template:
      'function formater(v: string | number): string {\n  if ({{0}} v === "number") {\n    return v.toFixed(2);\n  }\n  return v.toUpperCase();\n}',
    blanks: [["typeof"]],
    explanation:
      "`typeof v === \"number\"` est un type guard : dans le `if`, `v` est un `number`, et après le `return`, TypeScript sait qu'il ne reste que `string`.",
    glossary: ["narrowing", "union"],
  },
];
