import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "parametre",
    theme: "fonctions",
    term: "Paramètre",
    definition:
      "Variable déclarée dans la signature d'une fonction, qui reçoit une valeur au moment de l'appel.",
    example: "function saluer(nom: string) {\n  return `Bonjour ${nom}`;\n}",
    pitfall:
      "Paramètre (dans la déclaration) et argument (dans l'appel) sont souvent confondus.",
    related: ["argument", "type-de-retour"],
  },
  {
    id: "argument",
    theme: "fonctions",
    term: "Argument",
    definition: "Valeur concrète passée à une fonction lors de son appel.",
    example: 'function saluer(nom: string) {\n  return nom;\n}\nsaluer("Léa"); // "Léa" est l\'argument',
    pitfall:
      "TypeScript vérifie le nombre d'arguments : appeler une fonction avec un argument en trop est une erreur.",
    related: ["parametre"],
  },
  {
    id: "type-de-retour",
    theme: "fonctions",
    term: "Type de retour",
    definition:
      "Type de la valeur renvoyée par une fonction, écrit après la liste des paramètres. Il est inféré s'il est omis.",
    example: "function carre(n: number): number {\n  return n * n;\n}",
    pitfall:
      "Une fonction qui ne renvoie rien a le type de retour `void`, pas `undefined` ni `null`.",
    related: ["parametre", "fonction-flechee"],
  },
  {
    id: "fonction-flechee",
    theme: "fonctions",
    term: "Fonction fléchée",
    definition:
      "Syntaxe courte `(params) => expression` pour écrire une fonction. Elle n'a pas son propre `this`.",
    example: "const double = (n: number): number => n * 2;",
    pitfall:
      "Pour renvoyer un objet littéral, il faut des parenthèses : `() => ({ a: 1 })`, sinon les accolades sont lues comme un bloc.",
    related: ["type-de-retour", "parametre"],
  },
];
