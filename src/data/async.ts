import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: "async-01",
    theme: "async",
    format: "inference",
    type: "free",
    prompt: "Quel est le type inféré de `r` ?",
    code: { source: "async function charger() {\n  return 42;\n}\nconst r = charger();" },
    answers: ["Promise<number>"],
    caseSensitive: true,
    explanation:
      "Une fonction `async` renvoie toujours une `Promise`. Il faut `await` pour récupérer le `number`.",
    example: "async function charger() {\n  return 42;\n}\nasync function main() {\n  const n = await charger(); // number\n  return n;\n}",
    glossary: ["async-await", "promise"],
  },
  {
    id: "async-02",
    theme: "async",
    format: "notion",
    type: "mcq",
    prompt:
      "Quelle méthode attend la fin de toutes les promesses, même si certaines sont rejetées ?",
    choices: ["Promise.all", "Promise.race", "Promise.allSettled"],
    correct: 2,
    explanation:
      "`Promise.allSettled` attend toutes les promesses et renvoie le statut de chacune. `Promise.all` est rejetée dès le premier échec ; `Promise.race` s'arrête à la première promesse terminée.",
    glossary: ["promise-all", "promise"],
  },
  {
    id: "async-03",
    theme: "async",
    format: "inference",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "En mode `strict`, la variable `e` est de type `unknown`.",
    code: { source: 'try {\n  JSON.parse("{");\n} catch (e) {\n  console.log(e);\n}' },
    answer: true,
    explanation:
      "Avec `strict` (option `useUnknownInCatchVariables`), l'erreur capturée est `unknown`, car on peut lancer n'importe quelle valeur avec `throw`. Il faut la restreindre avant usage.",
    example:
      'try {\n  JSON.parse("{");\n} catch (e) {\n  if (e instanceof Error) console.log(e.message);\n}',
    glossary: ["try-catch", "unknown"],
  },
];
