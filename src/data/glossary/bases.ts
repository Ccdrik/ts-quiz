import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "variable",
    theme: "bases",
    term: "Variable",
    definition:
      "Un nom qui désigne une valeur stockée en mémoire. On la déclare avec `let` (réaffectable) ou `const` (non réaffectable) ; `var` est l'ancienne syntaxe à éviter.",
    example: "let score = 0;\nscore = score + 1;",
    pitfall:
      "`var` a une portée de fonction et non de bloc : une variable `var` déclarée dans un `if` est visible en dehors.",
    related: ["constante", "reaffectation"],
  },
  {
    id: "constante",
    theme: "bases",
    term: "Constante (const)",
    definition:
      "Une variable déclarée avec `const` : elle doit être initialisée immédiatement et ne peut plus être réaffectée.",
    example: "const PI = 3.14;\n// @ts-expect-error réaffectation interdite\nPI = 3;",
    pitfall:
      "`const` ne rend pas la valeur immuable : on peut toujours modifier les propriétés d'un objet ou les éléments d'un tableau `const`.",
    related: ["variable", "mutabilite", "reaffectation"],
  },
  {
    id: "reaffectation",
    theme: "bases",
    term: "Réaffectation",
    definition:
      "Donner une nouvelle valeur à une variable déjà déclarée, avec `=`. Possible avec `let`, interdit avec `const`.",
    example: "let ville = \"Lyon\";\nville = \"Nantes\"; // réaffectation",
    pitfall:
      "Ne pas confondre `=` (affectation) avec `===` (comparaison) dans une condition.",
    related: ["variable", "constante"],
  },
  {
    id: "mutabilite",
    theme: "bases",
    term: "Mutable / immuable",
    definition:
      "Une valeur mutable peut être modifiée après sa création (objets, tableaux). Une valeur immuable ne peut pas l'être (les primitifs comme `string` ou `number`).",
    example: "const tab = [1, 2];\ntab.push(3); // le tableau est muté\nconst copie = [...tab, 4]; // nouvelle valeur, tab inchangé",
    pitfall:
      "Copier un objet avec `=` copie la référence, pas l'objet : modifier la « copie » modifie l'original.",
    related: ["constante"],
  },
];
