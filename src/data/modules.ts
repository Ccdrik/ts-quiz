import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: "modules-01",
    theme: "modules",
    format: "notion",
    type: "mcq",
    prompt: "Combien d'`export default` un module peut-il contenir ?",
    choices: ["Un seul au maximum", "Autant qu'on veut", "Exactement un, c'est obligatoire"],
    correct: 0,
    explanation:
      "Un module a au plus un export par défaut, mais autant d'exports nommés que nécessaire. Un module peut aussi n'avoir aucun export par défaut.",
    glossary: ["export-default", "module"],
  },
  {
    id: "modules-02",
    theme: "modules",
    format: "notion",
    type: "blank",
    prompt: "Complète l'option qui active toutes les vérifications strictes.",
    template: '{\n  "compilerOptions": {\n    "{{0}}": true\n  }\n}',
    blanks: [["strict"]],
    lang: "json",
    check: false,
    explanation:
      "`strict: true` active notamment `noImplicitAny` et `strictNullChecks`. C'est le réglage recommandé pour tout nouveau projet.",
    glossary: ["tsconfig", "strict"],
  },
  {
    id: "modules-03",
    theme: "modules",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Une ligne `import type { User } from \"./user\"` disparaît entièrement du JavaScript compilé.",
    answer: true,
    explanation:
      "`import type` n'importe que des types, qui n'existent pas à l'exécution : le compilateur supprime la ligne.",
    glossary: ["import-type", "module"],
  },
];
