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
    glossary: ["promise-allsettled", "promise-all", "promise-race"],
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
    glossary: ["erreur-unknown", "try-catch"],
  },
  {
    id: "async-04",
    theme: "async",
    format: "notion",
    type: "mcq",
    prompt: "Dans quel ordre s'affichent les lettres ?",
    code: { source: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");' },
    choices: ["A, C, B", "A, B, C", "B, A, C", "C, A, B"],
    correct: 0,
    explanation:
      "`setTimeout` est asynchrone, même avec un délai de 0 : son callback ne s'exécute qu'une fois tout le code synchrone terminé.",
    glossary: ["synchrone-asynchrone", "event-loop"],
  },
  {
    id: "async-05",
    theme: "async",
    format: "notion",
    type: "mcq",
    prompt: "Dans quel ordre s'affichent les messages ?",
    code: {
      source:
        'setTimeout(() => console.log("timeout"), 0);\nPromise.resolve().then(() => console.log("promesse"));\nconsole.log("synchrone");',
    },
    choices: [
      "synchrone, promesse, timeout",
      "synchrone, timeout, promesse",
      "timeout, promesse, synchrone",
    ],
    correct: 0,
    explanation:
      "Le code synchrone passe d'abord. Ensuite, la boucle d'événements vide la file des micro-tâches (promesses) avant de passer aux tâches comme `setTimeout`.",
    glossary: ["event-loop", "promise"],
  },
  {
    id: "async-06",
    theme: "async",
    format: "notion",
    type: "blank",
    prompt: "Complète le type de retour de cette fonction asynchrone.",
    template:
      'async function charger(): {{0}}<string> {\n  const reponse = await fetch("/api/nom");\n  return reponse.text();\n}',
    blanks: [["Promise"]],
    caseSensitive: true,
    explanation:
      "Une fonction `async` renvoie toujours une `Promise`. Le type de retour s'écrit donc `Promise<string>`, même si le `return` fournit un `string`.",
    glossary: ["async-await", "promise"],
  },
  {
    id: "async-07",
    theme: "async",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: { source: 'function lire() {\n  const reponse = await fetch("/api");\n  return reponse;\n}' },
    choices: [
      "`await` n'est autorisé que dans une fonction `async`",
      "`fetch` ne renvoie pas de promesse",
      "Il faut écrire `await(fetch(\"/api\"))`",
    ],
    correct: 0,
    explanation:
      "Ajoute `async` devant `function` : la fonction renverra alors une `Promise<Response>`.",
    example: 'async function lire() {\n  const reponse = await fetch("/api");\n  return reponse;\n}',
    glossary: ["async-await"],
  },
  {
    id: "async-08",
    theme: "async",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Une promesse rejetée peut ensuite devenir tenue (fulfilled).",
    answer: false,
    explanation:
      "Une promesse ne change d'état qu'une fois : de `pending` vers `fulfilled` ou `rejected`. Ensuite, elle est réglée définitivement.",
    glossary: ["promise"],
  },
  {
    id: "async-09",
    theme: "async",
    format: "notion",
    type: "free",
    prompt: "Dans quel état reste indéfiniment cette promesse ? (nom anglais ou français)",
    code: { source: "const p = new Promise<number>(() => {\n  // ni resolve ni reject n'est appelé\n});" },
    answers: ["pending", "en attente", "attente"],
    explanation:
      "Tant que ni `resolve` ni `reject` n'est appelé, la promesse reste en attente (`pending`) : un `await p` ne se terminerait jamais.",
    glossary: ["promise"],
  },
  {
    id: "async-10",
    theme: "async",
    format: "notion",
    type: "blank",
    prompt: "Complète : traiter l'erreur, puis exécuter un code dans tous les cas.",
    template:
      'fetch("/api")\n  .then((r) => r.json())\n  .{{0}}((e) => console.error(e))\n  .{{1}}(() => console.log("terminé"));',
    blanks: [["catch"], ["finally"]],
    explanation:
      "`.catch` reçoit l'erreur d'une promesse rompue ; `.finally` s'exécute que la promesse soit tenue ou rompue, idéal pour masquer un indicateur de chargement.",
    glossary: ["then-catch"],
  },
  {
    id: "async-11",
    theme: "async",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "`await` bloque tout le programme, y compris l'interface, jusqu'à la fin de la requête.",
    answer: false,
    explanation:
      "`await` suspend uniquement la fonction `async` qui le contient. Pendant l'attente, la boucle d'événements continue de traiter les clics, les animations et les autres tâches.",
    glossary: ["bloquant", "async-await", "event-loop"],
  },
  {
    id: "async-12",
    theme: "async",
    format: "notion",
    type: "mcq",
    prompt: "Que renvoie `Promise.race([lente, rapide])` ?",
    choices: [
      "Une promesse réglée comme la première promesse terminée",
      "Le tableau des deux résultats",
      "Une promesse réglée comme la dernière promesse terminée",
    ],
    correct: 0,
    explanation:
      "`Promise.race` adopte le résultat (ou l'erreur) de la première promesse réglée. Elle sert par exemple à imposer un délai maximal à une requête.",
    glossary: ["promise-race"],
  },
  {
    id: "async-13",
    theme: "async",
    format: "inference",
    type: "free",
    prompt: "Quel est le type inféré de `resultats` ?",
    code: { source: 'const resultats = Promise.all([Promise.resolve(1), Promise.resolve("a")]);' },
    answers: ["Promise<[number, string]>"],
    caseSensitive: true,
    explanation:
      "`Promise.all` conserve la position et le type de chaque promesse : on obtient un tuple `[number, string]` enveloppé dans une `Promise`.",
    glossary: ["promise-all", "tuple"],
  },
  {
    id: "async-14",
    theme: "async",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas en mode strict ?",
    code: { source: 'try {\n  JSON.parse("{");\n} catch (e) {\n  console.log(e.message);\n}' },
    choices: [
      "`e` est de type `unknown` : il faut vérifier `e instanceof Error` avant de lire `message`",
      "`JSON.parse` ne peut pas lever d'erreur",
      "Il manque un bloc `finally`",
    ],
    correct: 0,
    explanation:
      "N'importe quelle valeur peut être lancée avec `throw`, donc `e` est `unknown`. Le test `instanceof Error` le restreint à `Error`.",
    example: 'try {\n  JSON.parse("{");\n} catch (e) {\n  if (e instanceof Error) console.log(e.message);\n}',
    glossary: ["erreur-unknown", "narrowing"],
  },
  {
    id: "async-15",
    theme: "async",
    format: "notion",
    type: "blank",
    prompt: "Complète pour lever une erreur.",
    template:
      'function diviser(a: number, b: number): number {\n  if (b === 0) {\n    {{0}} new Error("Division par zéro");\n  }\n  return a / b;\n}',
    blanks: [["throw"]],
    explanation:
      "`throw` interrompt la fonction et remonte jusqu'au `catch` le plus proche. Dans une fonction `async`, il rejette la promesse renvoyée.",
    glossary: ["throw", "try-catch"],
  },
  {
    id: "async-16",
    theme: "async",
    format: "notion",
    type: "mcq",
    prompt: "Que contient chaque élément du tableau renvoyé par `Promise.allSettled` ?",
    choices: [
      '`{ status: "fulfilled", value }` ou `{ status: "rejected", reason }`',
      "Uniquement les valeurs des promesses tenues",
      "La première erreur rencontrée",
    ],
    correct: 0,
    explanation:
      "Chaque résultat est un objet d'une union discriminée sur `status` : on teste `status` avant de lire `value` ou `reason`.",
    glossary: ["promise-allsettled", "union-discriminee"],
  },
  {
    id: "async-17",
    theme: "async",
    format: "notion",
    type: "mcq",
    prompt: "Combien de temps dure environ `charger()` ?",
    code: {
      source:
        "declare function attendre(ms: number): Promise<void>;\n\nasync function charger() {\n  await attendre(1000);\n  await attendre(1000);\n}",
    },
    choices: ["2 secondes", "1 seconde", "0 seconde"],
    correct: 0,
    explanation:
      "Chaque `await` attend la fin du précédent : les attentes sont séquentielles. Pour les lancer en parallèle (1 seconde au total), utilise `Promise.all`.",
    example:
      "declare function attendre(ms: number): Promise<void>;\nasync function charger() {\n  await Promise.all([attendre(1000), attendre(1000)]);\n}",
    glossary: ["async-await", "promise-all"],
  },
  {
    id: "async-18",
    theme: "async",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Le JavaScript d'une page web s'exécute sur un seul thread principal.",
    answer: true,
    explanation:
      "Un seul morceau de code s'exécute à la fois. L'asynchrone ne crée pas de parallélisme dans ton code : la boucle d'événements enchaîne les tâches quand la pile est vide.",
    glossary: ["event-loop", "synchrone-asynchrone"],
  },
];
