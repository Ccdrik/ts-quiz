import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "synchrone-asynchrone",
    theme: "async",
    term: "Synchrone vs asynchrone",
    definition:
      "Synchrone : chaque instruction attend la fin de la précédente. Asynchrone : une tâche longue (réseau, minuteur, fichier) est lancée, et le programme continue ; le résultat est traité plus tard.",
    example: 'console.log("1");\nsetTimeout(() => console.log("3 (plus tard)"), 0);\nconsole.log("2");',
    pitfall: "Le code après le lancement d'une tâche asynchrone s'exécute avant son résultat : on ne peut pas « récupérer » la valeur en ligne suivante sans `await`.",
    related: ["bloquant", "event-loop", "promise"],
  },
  {
    id: "bloquant",
    theme: "async",
    term: "Bloquant vs non bloquant",
    definition:
      "Une opération bloquante immobilise le thread jusqu'à sa fin (rien d'autre ne s'exécute, l'interface gèle). Une opération non bloquante rend la main immédiatement et signale son résultat plus tard.",
    example: "// Bloquant : une boucle de calcul longue gèle la page\nlet s = 0;\nfor (let i = 0; i < 1e6; i++) s += i;\n// Non bloquant : fetch rend la main tout de suite\nconst reponse = fetch(\"/api\");",
    pitfall: "`await` n'est pas bloquant : il suspend seulement la fonction `async`, le reste du programme continue.",
    related: ["synchrone-asynchrone", "event-loop"],
  },
  {
    id: "promise",
    theme: "async",
    term: "Promise (pending / fulfilled / rejected)",
    definition:
      "Objet représentant un résultat futur. Elle est d'abord en attente (pending), puis tenue (fulfilled) avec une valeur ou rompue (rejected) avec une erreur. Une fois réglée, elle ne change plus. Son type est `Promise<T>`.",
    example:
      'const p: Promise<number> = new Promise((resolve, reject) => {\n  const ok = Math.random() > 0.5;\n  if (ok) resolve(42);\n  else reject(new Error("raté"));\n});',
    pitfall: "Une promesse rejetée sans `catch` produit une erreur « Unhandled promise rejection ».",
    related: ["then-catch", "async-await", "promise-all"],
  },
  {
    id: "then-catch",
    theme: "async",
    term: "then / catch / finally",
    definition:
      "`.then(f)` traite la valeur d'une promesse tenue, `.catch(f)` traite l'erreur d'une promesse rompue, `.finally(f)` s'exécute dans les deux cas. Chaque méthode renvoie une nouvelle promesse, ce qui permet de les enchaîner.",
    example:
      'fetch("/api")\n  .then((r) => r.json())\n  .then((data) => console.log(data))\n  .catch((e) => console.error(e))\n  .finally(() => console.log("terminé"));',
    pitfall: "Oublier `return` dans un `.then` casse la chaîne : le `.then` suivant reçoit `undefined`.",
    related: ["promise", "async-await"],
  },
  {
    id: "async-await",
    theme: "async",
    term: "async / await",
    definition:
      "`async` fait renvoyer une `Promise` à une fonction ; `await` suspend la fonction jusqu'à ce que la promesse soit réglée et donne sa valeur. Le code asynchrone se lit alors comme du code synchrone.",
    example:
      "async function charger(): Promise<string> {\n  const rep = await fetch(\"/api\");\n  return rep.text();\n}",
    pitfall: "Oublier `await` : on obtient une `Promise` au lieu de la valeur. Et `await` n'est autorisé que dans une fonction `async` (ou au niveau supérieur d'un module).",
    related: ["promise", "try-catch", "awaited"],
  },
  {
    id: "promise-all",
    theme: "async",
    term: "Promise.all",
    definition:
      "Lance plusieurs promesses en parallèle et renvoie le tableau de leurs résultats, dans l'ordre, ou est rejetée dès le premier échec.",
    example:
      "async function main() {\n  const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(\"x\")]);\n  return [a, b]; // a : number, b : string\n}",
    pitfall: "Un seul rejet fait échouer l'ensemble ; utilise `Promise.allSettled` pour récupérer tous les résultats.",
    related: ["promise-allsettled", "promise-race", "promise"],
  },
  {
    id: "promise-race",
    theme: "async",
    term: "Promise.race",
    definition: "Renvoie une promesse réglée comme la première des promesses à se terminer, qu'elle soit tenue ou rompue.",
    example:
      'function delai(ms: number) {\n  return new Promise<never>((_, reject) => setTimeout(() => reject(new Error("trop long")), ms));\n}\nconst rapide = Promise.race([fetch("/api"), delai(5000)]);',
    pitfall: "Les promesses « perdantes » continuent de s'exécuter : `race` n'annule rien.",
    related: ["promise-all", "promise"],
  },
  {
    id: "promise-allsettled",
    theme: "async",
    term: "Promise.allSettled",
    definition:
      "Attend que toutes les promesses soient réglées et renvoie, pour chacune, `{ status: \"fulfilled\", value }` ou `{ status: \"rejected\", reason }`. Elle n'est jamais rejetée.",
    example:
      'async function main() {\n  const res = await Promise.allSettled([Promise.resolve(1), Promise.reject(new Error("x"))]);\n  for (const r of res) {\n    if (r.status === "fulfilled") console.log(r.value);\n    else console.log(r.reason);\n  }\n}',
    pitfall: "Il faut tester `status` (union discriminée) avant de lire `value` ou `reason`.",
    related: ["promise-all", "union-discriminee"],
  },
  {
    id: "try-catch",
    theme: "async",
    term: "try / catch / finally",
    definition:
      "Bloc qui exécute du code (`try`), intercepte une erreur levée (`catch`) et exécute toujours un code de nettoyage (`finally`). Avec `await`, il capture aussi les promesses rejetées.",
    example:
      "async function charger() {\n  try {\n    const r = await fetch(\"/api\");\n    return await r.json();\n  } catch (e) {\n    console.error(e);\n    return null;\n  } finally {\n    console.log(\"fin\");\n  }\n}",
    pitfall: "Sans `await`, une promesse rejetée dans le `try` n'est pas capturée par le `catch`.",
    related: ["throw", "erreur-unknown", "async-await"],
  },
  {
    id: "throw",
    theme: "async",
    term: "throw",
    definition: "Lève une erreur : l'exécution s'arrête et remonte jusqu'au `catch` le plus proche. Dans une fonction `async`, `throw` rejette la promesse renvoyée.",
    example: 'function diviser(a: number, b: number) {\n  if (b === 0) throw new Error("Division par zéro");\n  return a / b;\n}',
    pitfall: "On peut techniquement lancer n'importe quelle valeur (`throw \"oups\"`) ; lance toujours un objet `Error` pour garder la pile d'appels.",
    related: ["try-catch", "erreur-unknown", "void-never"],
  },
  {
    id: "erreur-unknown",
    theme: "async",
    term: "Erreur typée unknown",
    definition:
      "En mode `strict`, la variable d'un `catch` est de type `unknown` (option `useUnknownInCatchVariables`), car n'importe quelle valeur peut être lancée. Il faut la restreindre avant de l'utiliser.",
    example:
      "try {\n  JSON.parse(\"{\");\n} catch (e) {\n  const message = e instanceof Error ? e.message : String(e);\n  console.log(message);\n}",
    pitfall: "Écrire `catch (e: Error)` est interdit : seules les annotations `any` et `unknown` sont acceptées.",
    related: ["try-catch", "unknown", "narrowing"],
  },
  {
    id: "event-loop",
    theme: "async",
    term: "Event loop (boucle d'événements)",
    definition:
      "JavaScript exécute le code sur un seul thread. Quand la pile d'appels est vide, la boucle d'événements exécute d'abord les micro-tâches (callbacks de promesses), puis la tâche suivante (minuteur, clic, réponse réseau…).",
    example:
      'setTimeout(() => console.log("3. tâche (timeout)"), 0);\nPromise.resolve().then(() => console.log("2. micro-tâche (promesse)"));\nconsole.log("1. code synchrone");',
    pitfall: "`setTimeout(f, 0)` ne s'exécute pas immédiatement : il attend que le code synchrone et les micro-tâches soient terminés.",
    related: ["synchrone-asynchrone", "bloquant", "promise"],
  },
];
