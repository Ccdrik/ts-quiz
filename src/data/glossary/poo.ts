import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "classe",
    theme: "poo",
    term: "Classe",
    definition:
      "Modèle qui décrit les propriétés et méthodes d'un type d'objet ; on crée des objets à partir d'elle avec `new`.",
    example:
      "class Joueur {\n  constructor(public nom: string) {}\n  presenter() {\n    return `Je suis ${this.nom}`;\n  }\n}",
    pitfall: "Oublier `this.` pour accéder à une propriété dans une méthode.",
    related: ["instance", "constructeur"],
  },
  {
    id: "instance",
    theme: "poo",
    term: "Instance",
    definition: "Objet concret créé à partir d'une classe avec `new`.",
    example: 'class Joueur {\n  constructor(public nom: string) {}\n}\nconst j = new Joueur("Kanté");',
    pitfall: "Deux instances différentes ne sont jamais `===`, même avec les mêmes propriétés.",
    related: ["classe", "constructeur"],
  },
  {
    id: "constructeur",
    theme: "poo",
    term: "Constructeur",
    definition:
      "Méthode spéciale `constructor` appelée par `new` pour initialiser l'instance.",
    example:
      "class Point {\n  x: number;\n  constructor(x: number) {\n    this.x = x;\n  }\n}",
    pitfall:
      "Dans une classe enfant, il faut appeler `super(...)` avant d'utiliser `this` dans le constructeur.",
    related: ["classe", "instance"],
  },
  {
    id: "private",
    theme: "poo",
    term: "private",
    definition:
      "Modificateur qui rend un membre accessible uniquement depuis l'intérieur de la classe.",
    example: "class Compte {\n  private solde = 0;\n  deposer(n: number) {\n    this.solde += n;\n  }\n}",
    pitfall:
      "`private` n'existe qu'à la compilation ; pour une vraie confidentialité à l'exécution, utilise `#solde`.",
    related: ["classe"],
  },
  {
    id: "classe-abstraite",
    theme: "poo",
    term: "Classe abstraite",
    definition:
      "Classe marquée `abstract`, qu'on ne peut pas instancier ; elle sert de base à d'autres classes et peut déclarer des méthodes abstraites.",
    example:
      "abstract class Animal {\n  abstract cri(): string;\n}\nclass Chat extends Animal {\n  cri() {\n    return \"Miaou\";\n  }\n}",
    pitfall: "Une classe enfant doit implémenter toutes les méthodes abstraites, sinon erreur.",
    related: ["classe"],
  },
];
