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
    glossary: ["public-private", "encapsulation", "getter-setter"],
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
    glossary: ["classe-abstraite", "heritage"],
  },
  {
    id: "poo-04",
    theme: "poo",
    format: "notion",
    type: "blank",
    prompt: "Complète pour que `Chien` hérite de `Animal`.",
    template:
      'class Animal {\n  constructor(public nom: string) {}\n}\nclass Chien {{0}} Animal {\n  aboyer() {\n    return `${this.nom} : Wouf`;\n  }\n}',
    blanks: [["extends"]],
    explanation:
      "`extends` crée une relation d'héritage : `Chien` récupère la propriété `nom` et le constructeur d'`Animal`.",
    glossary: ["heritage"],
  },
  {
    id: "poo-05",
    theme: "poo",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: {
      source:
        "class Animal {\n  constructor(public nom: string) {}\n}\nclass Chien extends Animal {\n  race: string;\n  constructor(nom: string, race: string) {\n    this.race = race;\n  }\n}",
    },
    choices: [
      "Le constructeur enfant doit appeler `super(nom)` avant d'utiliser `this`",
      "Une classe enfant ne peut pas avoir de constructeur",
      "`race` doit être `private`",
      "Il faut écrire `Animal.nom = nom`",
    ],
    correct: 0,
    explanation:
      "Dans une classe enfant, `super(...)` appelle le constructeur parent ; il est obligatoire et doit précéder tout usage de `this`.",
    example:
      "class Animal {\n  constructor(public nom: string) {}\n}\nclass Chien extends Animal {\n  constructor(nom: string, public race: string) {\n    super(nom);\n  }\n}",
    glossary: ["super", "constructeur", "heritage"],
  },
  {
    id: "poo-06",
    theme: "poo",
    format: "nommer",
    type: "free",
    prompt:
      "Le mot-clé surligné attache la propriété à la classe elle-même, partagée par toutes les instances. Comment appelle-t-on un tel membre ?",
    code: { source: "class Joueur {\n  [[static]] total = 0;\n  constructor() {\n    Joueur.total++;\n  }\n}" },
    answers: ["membre statique", "statique", "propriété statique", "static", "un membre statique", "attribut statique"],
    explanation:
      "Un membre `static` appartient à la classe, pas aux instances : on y accède avec `Joueur.total`, et sa valeur est partagée.",
    glossary: ["membre-statique"],
  },
  {
    id: "poo-07",
    theme: "poo",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Un membre `protected` est accessible dans les classes qui héritent de la classe.",
    answer: true,
    explanation:
      "`protected` est accessible dans la classe et dans ses classes enfants, mais pas depuis l'extérieur. `private` l'interdirait aussi aux enfants.",
    example:
      "class Compte {\n  protected plafond = 1000;\n}\nclass ComptePremium extends Compte {\n  augmenter() {\n    this.plafond *= 2; // OK\n  }\n}\n// @ts-expect-error protected\nnew Compte().plafond;",
    glossary: ["public-private", "heritage"],
  },
  {
    id: "poo-08",
    theme: "poo",
    format: "notion",
    type: "mcq",
    prompt: "Quelle est la différence entre `#solde` et `private solde` ?",
    choices: [
      "`#solde` reste privé à l'exécution ; `private` n'est vérifié qu'à la compilation",
      "Aucune, ce sont deux écritures équivalentes",
      "`private` est privé à l'exécution ; `#solde` seulement à la compilation",
      "`#solde` est accessible dans les classes enfants",
    ],
    correct: 0,
    explanation:
      "`#` est une fonctionnalité de JavaScript : le champ est réellement inaccessible hors de la classe. `private` est effacé avec les types et n'empêche rien à l'exécution.",
    glossary: ["champ-prive", "public-private", "compile-runtime"],
  },
  {
    id: "poo-09",
    theme: "poo",
    format: "notion",
    type: "blank",
    prompt: "Complète pour que la classe s'engage à respecter l'interface `Volant`.",
    template:
      'interface Volant {\n  voler(): string;\n}\nclass Oiseau {{0}} Volant {\n  voler() {\n    return "Je vole";\n  }\n}',
    blanks: [["implements"]],
    explanation:
      "`implements` vérifie que la classe possède tout ce que l'interface demande. `extends` sert à hériter d'une classe.",
    glossary: ["implements", "interface"],
  },
  {
    id: "poo-10",
    theme: "poo",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: {
      source:
        'interface Volant {\n  voler(): string;\n}\nclass Pingouin implements Volant {\n  nager() {\n    return "Je nage";\n  }\n}',
    },
    choices: [
      "La classe ne fournit pas la méthode `voler` exigée par l'interface",
      "Une classe ne peut pas implémenter d'interface",
      "Il faut écrire `extends Volant`",
    ],
    correct: 0,
    explanation:
      "En déclarant `implements Volant`, la classe promet d'avoir une méthode `voler(): string`. Le compilateur signale que la promesse n'est pas tenue.",
    glossary: ["implements", "interface"],
  },
  {
    id: "poo-11",
    theme: "poo",
    format: "notion",
    type: "mcq",
    prompt: "Qu'affiche ce code ?",
    code: {
      source:
        "class Forme {\n  aire() {\n    return 0;\n  }\n}\nclass Carre extends Forme {\n  constructor(private c: number) {\n    super();\n  }\n  override aire() {\n    return this.c ** 2;\n  }\n}\nconst f: Forme = new Carre(3);\nconsole.log(f.aire());",
    },
    choices: ["9", "0", "Une erreur de compilation"],
    correct: 0,
    explanation:
      "Même typée `Forme`, la variable contient un `Carre` : c'est sa méthode redéfinie qui s'exécute. C'est le polymorphisme.",
    glossary: ["polymorphisme", "override"],
  },
  {
    id: "poo-12",
    theme: "poo",
    format: "notion",
    type: "blank",
    prompt: "Complète avec le mot-clé qui signale explicitement la redéfinition d'une méthode du parent.",
    template:
      'class Animal {\n  cri() {\n    return "...";\n  }\n}\nclass Chat extends Animal {\n  {{0}} cri() {\n    return "Miaou";\n  }\n}',
    blanks: [["override"]],
    explanation:
      "`override` indique une redéfinition. Avec l'option `noImplicitOverride`, il devient obligatoire et TypeScript signale une erreur si la méthode parente n'existe pas.",
    glossary: ["override", "heritage"],
  },
  {
    id: "poo-13",
    theme: "poo",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "La composition consiste à faire hériter une classe de plusieurs classes à la fois.",
    answer: false,
    explanation:
      "La composition consiste à utiliser d'autres objets comme propriétés (« a un »), au lieu d'hériter (« est un »). TypeScript n'autorise d'ailleurs qu'une seule classe parente.",
    glossary: ["composition", "heritage"],
  },
  {
    id: "poo-14",
    theme: "poo",
    format: "notion",
    type: "blank",
    prompt: "Complète pour que `aire` se lise comme une propriété, sans parenthèses.",
    template:
      "class Rectangle {\n  constructor(private l: number, private h: number) {}\n  {{0}} aire() {\n    return this.l * this.h;\n  }\n}\nconst r = new Rectangle(2, 3);\nconsole.log(r.aire); // 6",
    blanks: [["get"]],
    explanation:
      "Un getter `get aire()` s'utilise comme une propriété : `r.aire`. Sans setter, la propriété est en lecture seule.",
    glossary: ["getter-setter"],
  },
  {
    id: "poo-15",
    theme: "poo",
    format: "notion",
    type: "mcq",
    prompt:
      "Quel principe consiste à cacher l'état interne d'un objet et à n'exposer que des méthodes qui en garantissent la cohérence ?",
    choices: ["L'encapsulation", "Le polymorphisme", "L'héritage", "La composition"],
    correct: 0,
    explanation:
      "L'encapsulation protège l'état interne : par exemple un solde privé qu'on ne modifie qu'avec `deposer` et `retirer`, qui vérifient les montants.",
    glossary: ["encapsulation", "public-private"],
  },
  {
    id: "poo-16",
    theme: "poo",
    format: "inference",
    type: "free",
    prompt: "Quel est le type inféré de `p` ?",
    code: { source: "class Point {\n  constructor(public x: number, public y: number) {}\n}\nconst p = new Point(1, 2);" },
    answers: ["Point"],
    caseSensitive: true,
    explanation:
      "Une classe définit aussi un type du même nom : `new Point(...)` produit une valeur de type `Point`.",
    glossary: ["classe", "instance"],
  },
  {
    id: "poo-17",
    theme: "poo",
    format: "notion",
    type: "truefalse",
    prompt: "Vrai ou faux ?",
    statement: "Ici, TypeScript crée et initialise automatiquement la propriété `nom`.",
    code: { source: 'class Joueur {\n  constructor(public nom: string) {}\n}\nconsole.log(new Joueur("Léa").nom);' },
    answer: true,
    explanation:
      "Un modificateur (`public`, `private`, `readonly`…) devant un paramètre du constructeur en fait une propriété-paramètre : déclaration et affectation en une seule fois.",
    glossary: ["propriete-parametre", "constructeur"],
  },
  {
    id: "poo-18",
    theme: "poo",
    format: "erreur",
    type: "mcq",
    prompt: "Pourquoi ce code ne compile-t-il pas ?",
    code: {
      source:
        "class Joueur {\n  readonly id: number;\n  constructor(id: number) {\n    this.id = id;\n  }\n  changer() {\n    this.id = 2;\n  }\n}",
    },
    choices: [
      "Une propriété `readonly` ne peut être affectée que dans sa déclaration ou le constructeur",
      "Le constructeur ne peut pas affecter `id`",
      "Une méthode ne peut pas modifier `this`",
    ],
    correct: 0,
    explanation:
      "`readonly` autorise l'affectation à l'initialisation (déclaration ou constructeur), puis l'interdit partout ailleurs.",
    glossary: ["readonly", "propriete-parametre"],
  },
  {
    id: "poo-19",
    theme: "poo",
    format: "notion",
    type: "mcq",
    prompt: "À quoi sert `super.decrire()` dans la classe `Chien` ?",
    code: {
      source:
        "class Animal {\n  constructor(public nom: string) {}\n  decrire() {\n    return this.nom;\n  }\n}\nclass Chien extends Animal {\n  override decrire() {\n    return `${super.decrire()} (chien)`;\n  }\n}",
    },
    choices: [
      "À appeler la version de `decrire` définie dans la classe parente",
      "À appeler le constructeur d'`Animal`",
      "À rendre la méthode statique",
    ],
    correct: 0,
    explanation:
      "`super.methode()` appelle l'implémentation parente : la méthode enfant peut ainsi la compléter au lieu de la réécrire entièrement.",
    glossary: ["super", "override"],
  },
];
