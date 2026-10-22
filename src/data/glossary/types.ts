import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "annotation",
    theme: "types",
    term: "Annotation de type",
    definition: "Indiquer explicitement le type d'une variable, d'un paramètre ou d'un retour avec `: Type`.",
    example: "let age: number = 30;\nfunction carre(n: number): number {\n  return n * n;\n}",
    pitfall: "Annoter partout est inutile : laisse l'inférence travailler pour les variables locales, annote les paramètres et les API publiques.",
    related: ["inference", "typage-statique"],
  },
  {
    id: "inference",
    theme: "types",
    term: "Inférence de type",
    definition:
      "Capacité de TypeScript à deviner le type d'une valeur sans annotation explicite, à partir de sa valeur ou de son usage.",
    example: "let age = 30; // inféré : number\nconst nom = \"Léa\"; // inféré : \"Léa\"\nconst double = (n: number) => n * 2; // retour inféré : number",
    pitfall:
      "Un tableau vide `[]` sans annotation est mal inféré : écris `const liste: string[] = []`.",
    related: ["annotation", "type-litteral"],
  },
  {
    id: "typage-statique",
    theme: "types",
    term: "Typage statique vs dynamique",
    definition:
      "Statique : les types sont vérifiés avant l'exécution, à la compilation (TypeScript). Dynamique : les types ne sont connus et vérifiés qu'à l'exécution (JavaScript).",
    example: "function double(n: number) {\n  return n * 2;\n}\n// @ts-expect-error erreur détectée avant même d'exécuter le code\ndouble(\"3\");",
    pitfall: "Le typage statique ne protège pas des données externes (API, formulaire) : elles doivent être validées à l'exécution.",
    related: ["compile-runtime", "annotation"],
  },
  {
    id: "compile-runtime",
    theme: "types",
    term: "Compile-time vs runtime",
    definition:
      "Compile-time : le moment où `tsc` vérifie et transforme le code. Runtime : l'exécution du JavaScript produit. Les types n'existent qu'au compile-time : ils sont effacés dans le JavaScript.",
    example: "interface User {\n  nom: string;\n}\n// À l'exécution, User n'existe plus : on teste les propriétés.\nfunction estUser(x: object): x is User {\n  return \"nom\" in x;\n}",
    pitfall: "On ne peut pas faire `if (x instanceof User)` avec une interface ni lire un type à l'exécution.",
    related: ["typage-statique", "type-guard", "transpilation"],
  },
  {
    id: "any",
    theme: "types",
    term: "any",
    definition:
      "Type qui désactive toute vérification : on peut tout faire avec une valeur `any`.",
    example: "const x: any = 5;\nx.nimporteQuoi(); // compile, mais plante à l'exécution",
    pitfall:
      "`any` est contagieux : il se propage aux valeurs dérivées et fait perdre la sécurité du typage. Préfère `unknown`.",
    related: ["unknown", "no-implicit-any"],
  },
  {
    id: "unknown",
    theme: "types",
    term: "unknown",
    definition:
      "Type sûr pour une valeur inconnue : tout lui est assignable, mais il faut la restreindre avant de l'utiliser.",
    example:
      'function lire(x: unknown) {\n  if (typeof x === "number") return x.toFixed(1);\n  return "?";\n}',
    pitfall: "On ne peut pas appeler de méthode sur un `unknown` sans narrowing préalable.",
    related: ["any", "narrowing", "never"],
  },
  {
    id: "never",
    theme: "types",
    term: "never",
    definition:
      "Le type vide : aucune valeur ne peut l'avoir. C'est le type d'une fonction qui ne se termine jamais, et ce qu'il reste après avoir éliminé tous les cas d'une union.",
    example:
      'type Feu = "rouge" | "vert";\nfunction action(f: Feu) {\n  switch (f) {\n    case "rouge": return "stop";\n    case "vert": return "go";\n    default: {\n      const impossible: never = f; // erreur si un cas est oublié\n      return impossible;\n    }\n  }\n}',
    pitfall: "`never` n'est pas `void` : `void` signifie « ne renvoie rien d'utile », `never` « ne renvoie jamais ».",
    related: ["void-never", "union-discriminee", "unknown"],
  },
  {
    id: "interface",
    theme: "types",
    term: "Interface",
    definition:
      "Décrit la forme d'un objet : ses propriétés et leurs types. Une interface peut en étendre une autre avec `extends`.",
    example: "interface Personne {\n  nom: string;\n  age?: number;\n}\ninterface Joueur extends Personne {\n  numero: number;\n}",
    pitfall: "Deux interfaces de même nom dans la même portée fusionnent (declaration merging), ce qui peut surprendre.",
    related: ["alias-type", "intersection", "implements"],
  },
  {
    id: "alias-type",
    theme: "types",
    term: "type vs interface",
    definition:
      "`type` donne un nom à n'importe quel type (union, tuple, primitif, fonction…). `interface` ne décrit que des objets mais peut être étendue et fusionnée. Pour un objet, les deux conviennent.",
    example: 'type Id = string | number; // impossible avec interface\ntype Point = { x: number; y: number };\ninterface Point3D extends Point {\n  z: number;\n}',
    pitfall: "Choisis une convention dans le projet et tiens-t'y ; l'important est la cohérence.",
    related: ["interface", "union", "intersection"],
  },
  {
    id: "intersection",
    theme: "types",
    term: "Intersection (&)",
    definition: "Combine plusieurs types : une valeur de type `A & B` doit posséder toutes les propriétés de `A` et de `B`.",
    example: "type Nomme = { nom: string };\ntype Date_ = { creeLe: Date };\ntype Document_ = Nomme & Date_;\nconst d: Document_ = { nom: \"rapport\", creeLe: new Date() };",
    pitfall: "L'intersection de types primitifs incompatibles donne `never` : `string & number` n'a aucune valeur.",
    related: ["union", "interface", "alias-type"],
  },
  {
    id: "union",
    theme: "types",
    term: "Union (|)",
    definition: "Type qui accepte une valeur de l'un des types listés : `string | number`.",
    example: "function afficher(id: string | number) {\n  return String(id);\n}",
    pitfall:
      "Sur une union, on ne peut utiliser que ce qui est commun à tous les membres, sauf après un narrowing.",
    related: ["narrowing", "type-litteral", "union-discriminee", "intersection"],
  },
  {
    id: "type-litteral",
    theme: "types",
    term: "Type littéral",
    definition:
      "Type qui n'accepte qu'une seule valeur précise, comme `\"rouge\"` ou `42`. Souvent combiné en union.",
    example: 'type Feu = "rouge" | "orange" | "vert";\nconst f: Feu = "vert";',
    pitfall:
      "Avec `let`, un littéral est élargi (`let c = \"rouge\"` donne `string`) ; avec `const`, il reste littéral.",
    related: ["union", "inference", "as-const", "enum"],
  },
  {
    id: "narrowing",
    theme: "types",
    term: "Narrowing (restriction)",
    definition:
      "Réduire un type large à un type plus précis grâce à une vérification : `typeof`, `instanceof`, `in`, égalité ou type guard.",
    example:
      'function taille(v: string | string[]) {\n  if (typeof v === "string") return v.length; // v : string\n  return v.length; // v : string[]\n}',
    pitfall:
      "`typeof null === \"object\"` : un test `typeof x === \"object\"` ne suffit pas à exclure `null`.",
    related: ["union", "type-guard", "unknown"],
  },
  {
    id: "type-guard",
    theme: "types",
    term: "Type guard (typeof, instanceof, in, x is T)",
    definition:
      "Une vérification que TypeScript comprend et qui restreint le type : `typeof x === \"string\"`, `x instanceof Date`, `\"cle\" in x`, ou une fonction dont le retour est un prédicat `x is T`.",
    example:
      'function estString(x: unknown): x is string {\n  return typeof x === "string";\n}\nfunction f(v: unknown) {\n  if (estString(v)) return v.toUpperCase();\n  if (v instanceof Date) return v.getFullYear();\n  return null;\n}',
    pitfall: "Un prédicat `x is T` mal écrit ment au compilateur : TypeScript lui fait confiance sans vérifier.",
    related: ["narrowing", "compile-runtime", "filter"],
  },
  {
    id: "union-discriminee",
    theme: "types",
    term: "Union discriminée",
    definition:
      "Union d'objets qui partagent une propriété littérale (le discriminant, souvent `kind` ou `type`). Tester ce champ suffit à savoir de quel membre il s'agit.",
    example:
      'type Forme =\n  | { kind: "cercle"; rayon: number }\n  | { kind: "carre"; cote: number };\nfunction aire(f: Forme) {\n  return f.kind === "cercle" ? Math.PI * f.rayon ** 2 : f.cote ** 2;\n}',
    pitfall: "Le discriminant doit être un type littéral dans chaque membre ; un simple `string` ne permet pas le narrowing.",
    related: ["union", "never", "narrowing"],
  },
  {
    id: "assertion",
    theme: "types",
    term: "Assertion de type (as)",
    definition:
      "`valeur as Type` dit au compilateur « fais-moi confiance, c'est ce type ». Aucune vérification ni conversion n'a lieu à l'exécution.",
    example: 'const champ = document.querySelector("#email") as HTMLInputElement | null;\nconsole.log(champ?.value);',
    pitfall: "Une assertion fausse fait taire le compilateur et provoque des bugs à l'exécution ; préfère un narrowing.",
    related: ["non-null-assertion", "satisfies", "narrowing"],
  },
  {
    id: "non-null-assertion",
    theme: "types",
    term: "Non-null assertion (!)",
    definition: "`valeur!` retire `null` et `undefined` du type. Comme `as`, c'est une promesse au compilateur, sans vérification à l'exécution.",
    example: 'const titre = document.querySelector("h1")!; // HTMLHeadingElement\ntitre.textContent = "Bonjour";',
    pitfall: "Si la valeur est en réalité `null`, le programme plante : réserve `!` aux cas où tu es certain.",
    related: ["assertion", "strict-null-checks"],
  },
  {
    id: "satisfies",
    theme: "types",
    term: "satisfies",
    definition:
      "`expression satisfies Type` vérifie que la valeur est compatible avec `Type` tout en conservant son type le plus précis (contrairement à une annotation).",
    example:
      'type Palette = Record<string, string | number[]>;\nconst couleurs = {\n  rouge: [255, 0, 0],\n  vert: "#00ff00",\n} satisfies Palette;\ncouleurs.vert.toUpperCase(); // vert reste string',
    pitfall: "`satisfies` ne change pas le type : il vérifie seulement. Pour élargir le type, utilise une annotation.",
    related: ["assertion", "annotation", "as-const"],
  },
  {
    id: "readonly",
    theme: "types",
    term: "readonly",
    definition:
      "Marque une propriété ou un tableau comme non modifiable après création : toute affectation est une erreur de compilation.",
    example: "interface Config {\n  readonly url: string;\n}\nconst notes: readonly number[] = [12, 15];\n// @ts-expect-error tableau en lecture seule\nnotes.push(18);",
    pitfall: "`readonly` est superficiel et n'existe qu'à la compilation : les objets imbriqués restent modifiables.",
    related: ["as-const", "mutabilite", "readonly-utility"],
  },
  {
    id: "as-const",
    theme: "types",
    term: "as const",
    definition:
      "Assertion qui fige une valeur littérale : les chaînes et nombres gardent leur type littéral, les tableaux deviennent des tuples `readonly`, les propriétés deviennent `readonly`.",
    example: 'const roles = ["admin", "user"] as const; // readonly ["admin", "user"]\ntype Role = (typeof roles)[number]; // "admin" | "user"',
    pitfall: "`as const` n'a aucun effet à l'exécution : l'objet n'est pas gelé comme avec `Object.freeze`.",
    related: ["readonly", "type-litteral", "typeof-type"],
  },
  {
    id: "typage-structurel",
    theme: "types",
    term: "Typage structurel vs nominal",
    definition:
      "TypeScript est structurel : deux types sont compatibles s'ils ont la même forme, quels que soient leurs noms. Un langage nominal (Java, C#) exige que le type soit déclaré explicitement.",
    example: "interface Point {\n  x: number;\n  y: number;\n}\nclass Pixel {\n  constructor(public x: number, public y: number) {}\n}\nconst p: Point = new Pixel(1, 2); // OK : même forme",
    pitfall: "Deux types `type Euros = number` et `type Dollars = number` sont interchangeables : TypeScript ne les distingue pas.",
    related: ["interface", "implements"],
  },
  {
    id: "signature-index",
    theme: "types",
    term: "Signature d'index / Record",
    definition:
      "`{ [cle: string]: number }` décrit un objet dont les clés sont libres mais les valeurs typées. `Record<K, V>` est l'écriture courte équivalente.",
    example: "const stock: { [produit: string]: number } = { pommes: 3 };\nconst scores: Record<string, number> = { lea: 12 };\ntype Notes = Record<\"maths\" | \"anglais\", number>;",
    pitfall: "Avec une signature d'index, `stock[\"inconnu\"]` est typé `number` alors qu'il vaut `undefined` : active `noUncheckedIndexedAccess`.",
    related: ["notation-point-crochets", "mapped-types"],
  },
  {
    id: "enum",
    theme: "types",
    term: "Enum vs union de littéraux",
    definition:
      "Un `enum` crée un ensemble de constantes nommées et génère un objet JavaScript. Une union de littéraux (`\"haut\" | \"bas\"`) obtient le même résultat sans aucun code généré.",
    example: 'enum Direction {\n  Haut,\n  Bas,\n}\ntype Sens = "haut" | "bas";\nconst d = Direction.Haut; // 0\nconst s: Sens = "haut";',
    pitfall: "Les enums numériques acceptent n'importe quel nombre dans certaines versions ; la plupart des projets récents préfèrent les unions de littéraux.",
    related: ["type-litteral", "union"],
  },
];
