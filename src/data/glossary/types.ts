import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "inference",
    theme: "types",
    term: "Inférence de type",
    definition:
      "Capacité de TypeScript à deviner le type d'une valeur sans annotation explicite.",
    example: "let age = 30; // inféré : number\nconst nom = \"Léa\"; // inféré : \"Léa\"",
    pitfall:
      "Une variable déclarée sans valeur ni annotation (`let x;`) est inférée `any` au fil du code : annote-la.",
    related: ["type-litteral"],
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
    related: ["union", "inference"],
  },
  {
    id: "union",
    theme: "types",
    term: "Union (|)",
    definition: "Type qui accepte une valeur de l'un des types listés : `string | number`.",
    example: "function afficher(id: string | number) {\n  return String(id);\n}",
    pitfall:
      "Sur une union, on ne peut utiliser que ce qui est commun à tous les membres, sauf après un narrowing.",
    related: ["narrowing", "type-litteral"],
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
    related: ["union", "unknown"],
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
    related: ["unknown"],
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
    related: ["any", "narrowing"],
  },
];
