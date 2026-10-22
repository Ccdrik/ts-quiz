import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "generique",
    theme: "generiques",
    term: "Générique",
    definition:
      "Fonction ou type paramétré par un ou plusieurs types (`<T>`), réutilisable avec différents types tout en restant typé.",
    example:
      "function identite<T>(x: T): T {\n  return x;\n}\nconst s = identite(\"a\"); // \"a\"",
    pitfall: "Utiliser `any` au lieu d'un générique fait perdre le lien entre le type d'entrée et de sortie.",
    related: ["contrainte", "utility-types"],
  },
  {
    id: "contrainte",
    theme: "generiques",
    term: "Contrainte (extends)",
    definition:
      "Limite les types acceptés par un paramètre de type : `<T extends { length: number }>`.",
    example:
      "function plusLong<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}",
    pitfall:
      "Dans `<T extends X>`, `extends` signifie « est assignable à », pas « hérite de la classe ».",
    related: ["generique"],
  },
  {
    id: "utility-types",
    theme: "generiques",
    term: "Utility types",
    definition:
      "Types génériques fournis par TypeScript pour transformer d'autres types : `Partial`, `Pick`, `Omit`, `ReturnType`, `Awaited`…",
    example:
      "interface User { id: number; nom: string }\ntype Brouillon = Partial<User>; // { id?: number; nom?: string }",
    pitfall: "`Partial` n'agit qu'au premier niveau : les objets imbriqués restent obligatoires.",
    related: ["generique"],
  },
];
