import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "promise",
    theme: "async",
    term: "Promise",
    definition:
      "Objet représentant un résultat futur. Elle est d'abord en attente (pending), puis tenue (fulfilled) ou rompue (rejected). Type `Promise<T>`.",
    example:
      "const p: Promise<number> = new Promise((resolve) => {\n  setTimeout(() => resolve(42), 1000);\n});",
    pitfall: "Oublier de gérer le rejet (`catch` ou `try/catch`) laisse passer des erreurs silencieuses.",
    related: ["async-await", "promise-all"],
  },
  {
    id: "async-await",
    theme: "async",
    term: "async / await",
    definition:
      "`async` fait renvoyer une `Promise` à une fonction ; `await` suspend la fonction jusqu'à ce que la promesse soit résolue.",
    example:
      "async function charger(): Promise<string> {\n  const rep = await fetch(\"/api\");\n  return rep.text();\n}",
    pitfall: "Oublier `await` : on obtient une `Promise` au lieu de la valeur.",
    related: ["promise", "try-catch"],
  },
  {
    id: "promise-all",
    theme: "async",
    term: "Promise.all",
    definition:
      "Lance plusieurs promesses en parallèle et renvoie le tableau de leurs résultats, ou est rejetée au premier échec.",
    example:
      "async function main() {\n  const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(\"x\")]);\n  return [a, b];\n}",
    pitfall: "Un seul rejet fait échouer l'ensemble ; utilise `Promise.allSettled` pour récupérer tous les résultats.",
    related: ["promise"],
  },
  {
    id: "try-catch",
    theme: "async",
    term: "try / catch / finally",
    definition:
      "Bloc qui exécute du code (`try`), intercepte une erreur levée (`catch`) et exécute toujours un code de nettoyage (`finally`).",
    example:
      "try {\n  JSON.parse(\"{\");\n} catch (e) {\n  if (e instanceof Error) console.log(e.message);\n} finally {\n  console.log(\"fin\");\n}",
    pitfall: "En mode strict, `e` est `unknown` : vérifie `e instanceof Error` avant d'utiliser `e.message`.",
    related: ["async-await", "unknown"],
  },
];
