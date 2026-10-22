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
    glossary: ["compile-runtime", "type-guard"],
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
    glossary: ["narrowing", "union", "type-guard"],
  },
  {
    id: "types-04",
    theme: "types",
    format: "nommer",
    type: "free",
    prompt: "Comment s'appelle l'élément surligné ?",
    code: { source: "let age[[: number]] = 30;" },
    answers: ["annotation", "annotation de type", "une annotation", "une annotation de type"],
    explanation:
      "`: number` est une annotation de type. Ici elle est facultative : sans elle, TypeScript infère `number` à partir de `30`.",
    glossary: ["annotation", "inference"],
  },
  {
    id: "types-05",
    theme: "types",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Une valeur `unknown` peut être affectée à une variable de type `string` sans vérification.",
    answer: false,
    explanation:
      "Tout est assignable à `unknown`, mais `unknown` n'est assignable qu'à `unknown` et `any`. Il faut d'abord restreindre son type, par exemple avec `typeof`.",
    example:
      'declare const valeur: unknown;\n// @ts-expect-error unknown n\'est pas assignable à string\nconst s1: string = valeur;\nconst s2: string = typeof valeur === "string" ? valeur : "";',
    glossary: ["unknown", "any"],
  },
  {
    id: "types-06",
    theme: "types",
    format: "notion",
    type: "blank",
    prompt: "Complète avec le discriminant de l'union.",
    template:
      'type Forme =\n  | { kind: "cercle"; rayon: number }\n  | { kind: "carre"; cote: number };\n\nfunction aire(f: Forme): number {\n  switch (f.{{0}}) {\n    case "cercle":\n      return Math.PI * f.rayon ** 2;\n    case "carre":\n      return f.cote ** 2;\n  }\n}',
    blanks: [["kind"]],
    caseSensitive: true,
    explanation:
      "Dans une union discriminée, chaque membre a une propriété littérale commune (`kind`). Tester sa valeur restreint `f` au bon membre dans chaque `case`.",
    glossary: ["union-discriminee", "narrowing"],
  },
  {
    id: "types-07",
    theme: "types",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: { source: 'interface User {\n  nom: string;\n  age: number;\n}\nconst u: User = { nom: "Léa" };' },
    choices: [
      "Il manque la propriété obligatoire `age`",
      "Une interface ne peut pas typer une constante",
      "`nom` devrait être entre guillemets",
      "Il faut écrire `new User()`",
    ],
    correct: 0,
    explanation:
      "Toutes les propriétés d'une interface sont obligatoires, sauf celles marquées `?`. Ajoute `age` ou déclare `age?: number`.",
    glossary: ["interface"],
  },
  {
    id: "types-08",
    theme: "types",
    format: "inference",
    type: "free",
    prompt: "Quel est le type de `config.mode` ?",
    code: { source: 'const config = { mode: "dev", port: 3000 } as const;' },
    answers: ['"dev"', 'readonly "dev"'],
    explanation:
      "`as const` garde les types littéraux et rend les propriétés `readonly`. Sans lui, `config.mode` serait de type `string`.",
    example: 'const config = { mode: "dev" };\nconst m = config.mode; // string',
    glossary: ["as-const", "type-litteral", "readonly"],
  },
  {
    id: "types-09",
    theme: "types",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Ce code compile, bien que `p` ait une propriété `z` en trop.",
    code: {
      source: "interface Point {\n  x: number;\n  y: number;\n}\nconst p = { x: 1, y: 2, z: 3 };\nconst q: Point = p;",
    },
    answer: true,
    explanation:
      "Le typage est structurel : `p` possède `x` et `y`, il est donc compatible avec `Point`. Seul un littéral écrit directement (`const q: Point = { x: 1, y: 2, z: 3 }`) serait refusé pour propriété en trop.",
    glossary: ["typage-structurel", "interface"],
  },
  {
    id: "types-10",
    theme: "types",
    format: "notion",
    type: "blank",
    prompt: "Complète pour tester si `a` possède la méthode `miauler`.",
    template:
      'type Chat = { miauler(): void };\ntype Chien = { aboyer(): void };\n\nfunction crier(a: Chat | Chien) {\n  if ("miauler" {{0}} a) {\n    a.miauler();\n  } else {\n    a.aboyer();\n  }\n}',
    blanks: [["in"]],
    explanation:
      "L'opérateur `in` teste la présence d'une propriété et sert de type guard : dans le `if`, `a` est un `Chat`, dans le `else` un `Chien`.",
    glossary: ["type-guard", "narrowing"],
  },
  {
    id: "types-11",
    theme: "types",
    format: "nommer",
    type: "free",
    prompt: "Comment s'appelle le type de retour surligné ?",
    code: { source: 'function estString(x: unknown): [[x is string]] {\n  return typeof x === "string";\n}' },
    answers: ["type guard", "prédicat de type", "type predicate", "garde de type", "un prédicat de type", "un type guard"],
    explanation:
      "`x is string` est un prédicat de type : la fonction devient un type guard personnalisé. Après `if (estString(v))`, TypeScript sait que `v` est un `string`.",
    glossary: ["type-guard", "narrowing"],
  },
  {
    id: "types-12",
    theme: "types",
    format: "notion",
    type: "mcq",
    prompt: "Quel est l'avantage de `satisfies` ici par rapport à l'annotation `const palette: Palette` ?",
    code: {
      source:
        'type Palette = Record<string, string | number[]>;\nconst palette = {\n  rouge: [255, 0, 0],\n  vert: "#00ff00",\n} satisfies Palette;\npalette.vert.toUpperCase();',
    },
    choices: [
      "Le type précis est conservé : `palette.vert` reste un `string`",
      "Le code s'exécute plus vite",
      "La vérification de type est désactivée",
    ],
    correct: 0,
    explanation:
      "`satisfies` vérifie la compatibilité sans élargir le type. Avec l'annotation, `palette.vert` serait `string | number[]` et `toUpperCase` serait refusé.",
    glossary: ["satisfies", "annotation", "signature-index"],
  },
  {
    id: "types-13",
    theme: "types",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: {
      source:
        'interface Config {\n  readonly url: string;\n}\nconst c: Config = { url: "https://exemple.fr" };\nc.url = "https://autre.fr";',
    },
    choices: [
      "`url` est `readonly` : on ne peut plus la modifier après la création",
      "`c` est une `const`, donc aucune propriété n'est modifiable",
      "Une URL doit être de type `URL`",
    ],
    correct: 0,
    explanation:
      "`readonly` interdit la réaffectation de la propriété. Note que `const` seul n'aurait pas suffi : il protège la variable, pas les propriétés.",
    glossary: ["readonly", "constante"],
  },
  {
    id: "types-14",
    theme: "types",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Le `!` dans `el!.focus()` vérifie à l'exécution que `el` n'est pas `null`.",
    code: { source: 'const el = document.querySelector("input");\nel!.focus();' },
    answer: false,
    explanation:
      "La non-null assertion `!` n'existe qu'à la compilation : elle retire `null` du type sans rien vérifier. Si `el` est `null`, le programme plante. Préfère `el?.focus()` ou un `if`.",
    glossary: ["non-null-assertion", "assertion"],
  },
  {
    id: "types-15",
    theme: "types",
    format: "notion",
    type: "mcq",
    prompt: "Quelle valeur est de type `A` ?",
    code: { source: "type A = { a: number } & { b: string };" },
    choices: ['`{ a: 1, b: "x" }`', "`{ a: 1 }`", '`{ b: "x" }`'],
    correct: 0,
    explanation:
      "Une intersection exige toutes les propriétés des deux types. Une union `|` se contenterait de l'un ou l'autre.",
    glossary: ["intersection", "union"],
  },
  {
    id: "types-16",
    theme: "types",
    format: "inference",
    type: "free",
    prompt: "Quel est le type de `v` à la ligne surlignée ?",
    code: {
      source: 'function f(v: string | number | boolean) {\n  if (typeof v === "string") return;\n  [[console.log(v)]];\n}',
    },
    answers: ["number | boolean", "boolean | number"],
    explanation:
      "Après le `return` du cas `string`, TypeScript sait que `v` ne peut plus être une chaîne : il reste `number | boolean`. C'est le narrowing par contrôle de flux.",
    glossary: ["narrowing", "union"],
  },
  {
    id: "types-17",
    theme: "types",
    format: "notion",
    type: "mcq",
    prompt: "Que reste-t-il de ces deux déclarations dans le JavaScript compilé ?",
    code: { source: 'enum Direction {\n  Haut,\n  Bas,\n}\ntype Sens = "haut" | "bas";' },
    choices: [
      "Seulement l'enum `Direction`, sous forme d'objet",
      "Seulement le type `Sens`",
      "Les deux",
      "Aucun des deux",
    ],
    correct: 0,
    explanation:
      "Un `enum` génère un objet JavaScript. Un `type`, comme tout type, est effacé à la compilation : l'union de littéraux ne coûte rien à l'exécution.",
    glossary: ["enum", "compile-runtime", "type-litteral"],
  },
  {
    id: "types-18",
    theme: "types",
    format: "notion",
    type: "blank",
    prompt: "Complète avec le type utilitaire qui décrit un objet aux clés `string` et aux valeurs `number`.",
    template: "const scores: {{0}}<string, number> = { lea: 12, tom: 15 };",
    blanks: [["Record"]],
    caseSensitive: true,
    explanation:
      "`Record<string, number>` équivaut à la signature d'index `{ [cle: string]: number }`.",
    glossary: ["signature-index"],
  },
  {
    id: "types-19",
    theme: "types",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "TypeScript vérifie les types pendant que le programme s'exécute dans le navigateur.",
    answer: false,
    explanation:
      "TypeScript est typé statiquement : la vérification a lieu à la compilation. Le navigateur exécute du JavaScript, sans aucun type.",
    glossary: ["typage-statique", "compile-runtime"],
  },
  {
    id: "types-20",
    theme: "types",
    format: "notion",
    type: "blank",
    prompt: "Complète pour que l'oubli d'un cas futur de `Feu` provoque une erreur de compilation.",
    template:
      'type Feu = "rouge" | "vert";\n\nfunction action(f: Feu): string {\n  switch (f) {\n    case "rouge":\n      return "stop";\n    case "vert":\n      return "go";\n    default: {\n      const impossible: {{0}} = f;\n      return impossible;\n    }\n  }\n}',
    blanks: [["never"]],
    explanation:
      "Dans le `default`, tous les cas ont été traités : `f` est de type `never`. Si on ajoute `\"orange\"` à `Feu` sans le gérer, l'affectation à `never` échoue.",
    glossary: ["never", "union-discriminee"],
  },
  {
    id: "types-21",
    theme: "types",
    format: "notion",
    type: "mcq",
    prompt: "Lequel de ces types ne peut pas s'écrire avec `interface` ?",
    choices: ["`string | number`", "`{ nom: string }`", "Un objet avec une méthode"],
    correct: 0,
    explanation:
      "Une interface décrit uniquement la forme d'un objet. Une union, un tuple ou un alias de primitif nécessitent `type`.",
    glossary: ["alias-type", "interface", "union"],
  },
];
