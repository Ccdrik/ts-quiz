import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "tableau",
    theme: "donnees",
    term: "Tableau",
    definition:
      "Liste ordonnée de valeurs accessibles par leur index (à partir de 0). Type `T[]` ou `Array<T>`.",
    example: "const notes: number[] = [12, 15, 9];\nconst premiere = notes[0];",
    pitfall:
      "Accéder à un index qui n'existe pas renvoie `undefined` sans erreur à l'exécution.",
    related: ["tuple", "map"],
  },
  {
    id: "tuple",
    theme: "donnees",
    term: "Tuple",
    definition:
      "Tableau de longueur fixe dont chaque position a un type précis, par exemple `[string, number]`.",
    example: 'const joueur: [string, number] = ["Zidane", 10];\nconst [nom, numero] = joueur;',
    pitfall:
      "Sans annotation, `[\"a\", 1]` est inféré comme `(string | number)[]`, pas comme un tuple.",
    related: ["tableau"],
  },
  {
    id: "map",
    theme: "donnees",
    term: "map()",
    definition:
      "Méthode de tableau qui applique une fonction à chaque élément et renvoie un nouveau tableau de même longueur.",
    example: "const prix = [10, 20];\nconst ttc = prix.map((p) => p * 1.2);",
    pitfall:
      "`map` ne modifie pas le tableau d'origine ; pour simplement parcourir sans rien produire, utilise `for...of` ou `forEach`.",
    related: ["tableau"],
  },
];
