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
    glossary: ["parametre", "type-de-retour", "signature"],
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
  {
    id: "fonctions-04",
    theme: "fonctions",
    format: "nommer",
    type: "free",
    prompt: "Comment s'appelle l'élément surligné ?",
    code: { source: 'function saluer(nom: string) {\n  return nom;\n}\nsaluer([["Léa"]]);' },
    answers: ["argument", "un argument", "l'argument"],
    explanation:
      "La valeur passée lors de l'appel est un argument. Elle est reçue par le paramètre `nom`.",
    glossary: ["argument", "parametre"],
  },
  {
    id: "fonctions-05",
    theme: "fonctions",
    format: "notion",
    type: "blank",
    prompt: "Complète pour que la fonction accepte un nombre quelconque d'arguments.",
    template:
      "function somme({{0}}nombres: number[]): number {\n  return nombres.reduce((a, b) => a + b, 0);\n}\nsomme(1, 2, 3);",
    blanks: [["..."]],
    explanation:
      "Le paramètre rest `...nombres` regroupe tous les arguments dans un tableau `number[]`. Il doit être le dernier paramètre.",
    glossary: ["parametre-rest"],
  },
  {
    id: "fonctions-06",
    theme: "fonctions",
    format: "inference",
    type: "mcq",
    prompt: "Quel est le type de retour inféré de `log` ?",
    code: { source: "function log(message: string) {\n  console.log(message);\n}" },
    choices: ["void", "undefined", "never", "string"],
    correct: 0,
    explanation:
      "Une fonction sans `return` a le type de retour `void` : elle ne renvoie rien d'utile. `never` serait réservé à une fonction qui ne se termine jamais normalement.",
    glossary: ["void-never", "type-de-retour"],
  },
  {
    id: "fonctions-07",
    theme: "fonctions",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: {
      source:
        "function diviser(a: number, b: number): number {\n  if (b === 0) {\n    return;\n  }\n  return a / b;\n}",
    },
    choices: [
      "`return;` renvoie `undefined`, incompatible avec le type de retour `number`",
      "On ne peut pas avoir deux `return` dans une fonction",
      "`b === 0` n'est pas une condition valide",
      "Il faut écrire `return void`",
    ],
    correct: 0,
    explanation:
      "Le type de retour annoncé est `number` : chaque `return` doit fournir un nombre. Change le type en `number | undefined` ou lève une erreur.",
    example:
      'function diviser(a: number, b: number): number {\n  if (b === 0) throw new Error("Division par zéro");\n  return a / b;\n}',
    glossary: ["type-de-retour", "signature"],
  },
  {
    id: "fonctions-08",
    theme: "fonctions",
    format: "notion",
    type: "free",
    prompt:
      "La fonction renvoyée garde accès à `n` même après la fin de `compteur()`. Comment appelle-t-on ce mécanisme ?",
    code: { source: "function compteur() {\n  let n = 0;\n  return () => ++n;\n}\nconst suivant = compteur();\nsuivant(); // 1\nsuivant(); // 2" },
    answers: ["closure", "une closure", "fermeture", "une fermeture"],
    explanation:
      "La fonction fléchée « capture » la variable `n` de sa portée de création : c'est une closure. Chaque appel à `compteur()` crée un nouveau `n` indépendant.",
    glossary: ["closure", "portee"],
  },
  {
    id: "fonctions-09",
    theme: "fonctions",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "La fonction `ajouter` est une fonction pure.",
    code: { source: "let total = 0;\nfunction ajouter(n: number) {\n  total += n;\n  return total;\n}" },
    answer: false,
    explanation:
      "`ajouter` modifie la variable extérieure `total` (effet de bord) et ne renvoie pas toujours le même résultat pour le même argument : elle n'est pas pure.",
    example: "const ajouter = (total: number, n: number) => total + n; // pure",
    glossary: ["fonction-pure"],
  },
  {
    id: "fonctions-10",
    theme: "fonctions",
    format: "nommer",
    type: "free",
    prompt: "Quel est le rôle de la fonction surlignée, passée en argument à `map` ?",
    code: { source: "const doubles = [1, 2, 3].map([[(n) => n * 2]]);" },
    answers: ["callback", "un callback", "fonction de rappel", "une fonction de rappel", "fonction callback"],
    explanation:
      "Une fonction passée en argument pour être appelée plus tard est un callback. `map` l'appelle une fois par élément.",
    glossary: ["callback", "ordre-superieur", "fonction-anonyme"],
  },
  {
    id: "fonctions-11",
    theme: "fonctions",
    format: "notion",
    type: "mcq",
    prompt: "Comment appelle-t-on une fonction comme `map`, qui prend une fonction en paramètre ?",
    choices: [
      "Une fonction d'ordre supérieur",
      "Une fonction pure",
      "Une fonction récursive",
      "Une fonction anonyme",
    ],
    correct: 0,
    explanation:
      "Une fonction d'ordre supérieur prend une fonction en paramètre ou en renvoie une. `filter`, `reduce` et `setTimeout` en sont d'autres exemples.",
    glossary: ["ordre-superieur", "callback"],
  },
  {
    id: "fonctions-12",
    theme: "fonctions",
    format: "inference",
    type: "free",
    prompt: "Quel est le type de retour inféré de `echouer` ?",
    code: { source: "const echouer = (message: string) => {\n  throw new Error(message);\n};" },
    answers: ["never"],
    explanation:
      "La fonction lève toujours une erreur : elle ne renvoie jamais. Pour une fonction fléchée, TypeScript infère `never`. Attention, une fonction déclarée avec `function` serait inférée `void`.",
    glossary: ["void-never", "never"],
  },
  {
    id: "fonctions-13",
    theme: "fonctions",
    format: "notion",
    type: "blank",
    prompt: "Rends le paramètre `nom` optionnel.",
    template: 'function saluer(nom{{0}}: string) {\n  return `Bonjour ${nom ?? "invité"}`;\n}\nsaluer();',
    blanks: [["?"]],
    explanation:
      "Avec `nom?: string`, l'argument peut être omis : `nom` vaut alors `undefined` et son type est `string | undefined`.",
    example: 'function saluer(nom = "invité") {\n  return `Bonjour ${nom}`;\n} // variante : valeur par défaut',
    glossary: ["parametre-optionnel", "parametre-defaut"],
  },
  {
    id: "fonctions-14",
    theme: "fonctions",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Un paramètre optionnel peut être placé avant un paramètre obligatoire.",
    answer: false,
    explanation:
      "Les paramètres optionnels doivent venir après les obligatoires : sinon on ne saurait pas à quel paramètre correspond chaque argument.",
    example: "function f(obligatoire: string, optionnel?: number) {\n  return obligatoire + (optionnel ?? 0);\n}",
    glossary: ["parametre-optionnel"],
  },
  {
    id: "fonctions-15",
    theme: "fonctions",
    format: "notion",
    type: "mcq",
    prompt: "Pourquoi utilise-t-on une fonction fléchée dans `setTimeout` ici ?",
    code: {
      source:
        "const compteur = {\n  valeur: 0,\n  incrementer() {\n    setTimeout(() => {\n      this.valeur++;\n    }, 100);\n  },\n};",
    },
    choices: [
      "Elle reprend le `this` de `incrementer`, donc `this` désigne `compteur`",
      "Elle s'exécute plus vite",
      "`setTimeout` n'accepte que des fonctions fléchées",
    ],
    correct: 0,
    explanation:
      "Une fonction fléchée n'a pas son propre `this`. Avec `function () {}`, `this` ne désignerait plus `compteur` lors de l'appel par `setTimeout`.",
    glossary: ["this", "fonction-flechee"],
  },
  {
    id: "fonctions-16",
    theme: "fonctions",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Sans la ligne `if (n <= 1) return 1;`, cette fonction tournerait indéfiniment jusqu'à planter.",
    code: {
      source: "function factorielle(n: number): number {\n  if (n <= 1) return 1;\n  return n * factorielle(n - 1);\n}",
    },
    answer: true,
    explanation:
      "Une fonction récursive a besoin d'un cas de base. Sans lui, les appels s'empilent jusqu'à l'erreur « Maximum call stack size exceeded ».",
    glossary: ["recursivite"],
  },
  {
    id: "fonctions-17",
    theme: "fonctions",
    format: "nommer",
    type: "mcq",
    prompt: "Comment appelle-t-on les deux lignes surlignées ?",
    code: {
      source:
        "[[function formater(x: string): string;\nfunction formater(x: number): string;]]\nfunction formater(x: string | number): string {\n  return String(x);\n}",
    },
    choices: [
      "Des signatures de surcharge (overloads)",
      "Des appels de fonction",
      "Des déclarations en double : c'est une erreur",
    ],
    correct: 0,
    explanation:
      "Ce sont des surcharges : plusieurs signatures visibles par l'appelant, suivies d'une seule implémentation compatible avec toutes.",
    glossary: ["surcharge", "signature"],
  },
  {
    id: "fonctions-18",
    theme: "fonctions",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: { source: 'function saluer(nom: string) {\n  return `Bonjour ${nom}`;\n}\nsaluer("Léa", "Paul");' },
    choices: [
      "Trop d'arguments : la fonction n'attend qu'un paramètre",
      "Les guillemets doubles sont interdits",
      "`saluer` doit être déclarée avec `const`",
    ],
    correct: 0,
    explanation:
      "TypeScript vérifie le nombre d'arguments par rapport aux paramètres. Pour accepter plusieurs noms, utilise un paramètre rest `...noms: string[]`.",
    glossary: ["argument", "parametre", "parametre-rest"],
  },
  {
    id: "fonctions-19",
    theme: "fonctions",
    format: "nommer",
    type: "free",
    prompt: "Comment s'appelle la syntaxe surlignée, qui étale le tableau en arguments séparés ?",
    code: { source: "const notes = [12, 17, 9];\nconst meilleure = Math.max([[...]]notes);" },
    answers: ["spread", "opérateur spread", "le spread", "décomposition", "syntaxe de décomposition", "propagation"],
    explanation:
      "Le spread `...` étale les éléments du tableau : `Math.max(...notes)` équivaut à `Math.max(12, 17, 9)`.",
    glossary: ["spread-rest", "parametre-rest"],
  },
];
