import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: "poo-01",
    theme: "poo",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: {
      source:
        "class Compte {\n  private solde = 0;\n}\nconst c = new Compte();\nconsole.log(c.solde);",
    },
    choices: [
      "`solde` est `private` : inaccessible hors de la classe",
      "Il manque un constructeur",
      "`console.log` n'accepte pas de `number`",
      "Il faut écrire `Compte.solde`",
    ],
    correct: 0,
    explanation:
      "Un membre `private` n'est accessible que dans le corps de la classe. Pour exposer la valeur en lecture, ajoute un getter.",
    example:
      "class Compte {\n  private _solde = 0;\n  get solde() {\n    return this._solde;\n  }\n}\nconsole.log(new Compte().solde);",
    glossary: ["private", "classe"],
  },
  {
    id: "poo-02",
    theme: "poo",
    format: "nommer",
    type: "free",
    prompt: "Comment appelle-t-on l'objet stocké dans l'élément surligné ?",
    code: {
      source:
        'class Joueur {\n  constructor(public nom: string) {}\n}\nconst [[j]] = new Joueur("Mbappé");',
    },
    answers: ["instance", "une instance", "instance de Joueur", "objet"],
    explanation:
      "`new Joueur(...)` crée une instance de la classe `Joueur`. La classe est le plan de construction, l'instance est l'objet construit.",
    glossary: ["instance", "classe", "constructeur"],
  },
  {
    id: "poo-03",
    theme: "poo",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "On peut créer un objet directement à partir d'une classe abstraite avec `new`.",
    answer: false,
    explanation:
      "Une classe abstraite sert de modèle : on ne peut instancier que les classes qui en héritent.",
    example:
      "abstract class Forme {\n  abstract aire(): number;\n}\nclass Carre extends Forme {\n  constructor(private c: number) { super(); }\n  aire() { return this.c ** 2; }\n}\n// @ts-expect-error classe abstraite\nnew Forme();",
    glossary: ["classe-abstraite", "classe"],
  },
];
