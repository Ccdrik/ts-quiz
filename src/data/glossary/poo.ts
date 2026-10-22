import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "classe",
    theme: "poo",
    term: "Classe",
    definition:
      "Modèle qui décrit les propriétés et méthodes d'un type d'objet ; on crée des objets à partir d'elle avec `new`. En TypeScript, une classe définit aussi un type du même nom.",
    example:
      "class Joueur {\n  constructor(public nom: string) {}\n  presenter() {\n    return `Je suis ${this.nom}`;\n  }\n}",
    pitfall: "Oublier `this.` pour accéder à une propriété dans une méthode.",
    related: ["instance", "constructeur", "heritage"],
  },
  {
    id: "instance",
    theme: "poo",
    term: "Instance (new)",
    definition: "Objet concret créé à partir d'une classe avec l'opérateur `new`, qui appelle le constructeur.",
    example: 'class Joueur {\n  constructor(public nom: string) {}\n}\nconst j = new Joueur("Kanté");\nconsole.log(j instanceof Joueur); // true',
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
      "class Point {\n  x: number;\n  constructor(x: number) {\n    this.x = x;\n  }\n}\nconst p = new Point(3);",
    pitfall:
      "Dans une classe enfant, il faut appeler `super(...)` avant d'utiliser `this` dans le constructeur.",
    related: ["classe", "instance", "propriete-parametre", "super"],
  },
  {
    id: "propriete-parametre",
    theme: "poo",
    term: "Propriété de classe / propriété-paramètre",
    definition:
      "Une propriété de classe est une donnée de chaque instance, déclarée dans le corps de la classe. Un modificateur (`public`, `private`, `readonly`) devant un paramètre du constructeur déclare et initialise la propriété en une fois.",
    example:
      "class Joueur {\n  buts = 0; // propriété avec valeur initiale\n  constructor(public nom: string, private age: number) {}\n  // équivaut à déclarer nom et age puis faire this.nom = nom…\n}",
    pitfall: "En mode strict, une propriété déclarée sans valeur doit être initialisée dans le constructeur (`strictPropertyInitialization`).",
    related: ["constructeur", "public-private"],
  },
  {
    id: "membre-statique",
    theme: "poo",
    term: "Membre statique (static)",
    definition: "Propriété ou méthode attachée à la classe elle-même, partagée par toutes les instances. On y accède avec `NomDeClasse.membre`.",
    example: "class Joueur {\n  static total = 0;\n  constructor() {\n    Joueur.total++;\n  }\n  static reinitialiser() {\n    Joueur.total = 0;\n  }\n}",
    pitfall: "Dans une méthode statique, `this` désigne la classe, pas une instance.",
    related: ["classe"],
  },
  {
    id: "public-private",
    theme: "poo",
    term: "public / private / protected",
    definition:
      "Modificateurs de visibilité. `public` (par défaut) : accessible partout. `private` : seulement dans la classe. `protected` : dans la classe et ses classes enfants.",
    example:
      "class Compte {\n  public titulaire = \"Léa\";\n  protected plafond = 1000;\n  private solde = 0;\n  deposer(n: number) {\n    this.solde += n;\n  }\n}",
    pitfall:
      "`private` et `protected` n'existent qu'à la compilation ; pour une vraie confidentialité à l'exécution, utilise `#champ`.",
    related: ["champ-prive", "encapsulation", "heritage"],
  },
  {
    id: "champ-prive",
    theme: "poo",
    term: "Champ privé (#)",
    definition: "Un nom commençant par `#` est un champ privé JavaScript : il est inaccessible hors de la classe, même à l'exécution.",
    example: "class Compte {\n  #solde = 0;\n  deposer(n: number) {\n    this.#solde += n;\n  }\n  get solde() {\n    return this.#solde;\n  }\n}",
    pitfall: "Le `#` fait partie du nom : on écrit toujours `this.#solde`, jamais `this.solde`.",
    related: ["public-private", "encapsulation"],
  },
  {
    id: "heritage",
    theme: "poo",
    term: "Héritage (extends)",
    definition: "Une classe enfant (`class B extends A`) récupère les propriétés et méthodes de sa classe parente et peut les compléter ou les redéfinir.",
    example:
      'class Animal {\n  constructor(public nom: string) {}\n  manger() {\n    return `${this.nom} mange`;\n  }\n}\nclass Chien extends Animal {\n  aboyer() {\n    return "Wouf";\n  }\n}\nnew Chien("Rex").manger();',
    pitfall: "Une classe ne peut hériter que d'une seule classe ; pour combiner des comportements, préfère la composition.",
    related: ["super", "override", "composition", "classe-abstraite"],
  },
  {
    id: "super",
    theme: "poo",
    term: "super",
    definition: "Dans une classe enfant, `super(...)` appelle le constructeur parent et `super.methode()` appelle la version parente d'une méthode.",
    example:
      "class Animal {\n  constructor(public nom: string) {}\n  decrire() {\n    return this.nom;\n  }\n}\nclass Chien extends Animal {\n  constructor(nom: string, public race: string) {\n    super(nom);\n  }\n  override decrire() {\n    return `${super.decrire()} (${this.race})`;\n  }\n}",
    pitfall: "Dans un constructeur enfant, utiliser `this` avant `super()` est une erreur.",
    related: ["heritage", "constructeur", "override"],
  },
  {
    id: "override",
    theme: "poo",
    term: "override",
    definition: "Mot-clé qui indique qu'une méthode redéfinit celle de la classe parente. Avec l'option `noImplicitOverride`, il devient obligatoire, ce qui évite les fautes de frappe.",
    example: "class Forme {\n  aire() {\n    return 0;\n  }\n}\nclass Carre extends Forme {\n  constructor(private c: number) {\n    super();\n  }\n  override aire() {\n    return this.c ** 2;\n  }\n}",
    pitfall: "Sans `override`, renommer la méthode parente laisse l'ancienne méthode enfant orpheline sans aucune erreur.",
    related: ["heritage", "polymorphisme", "super"],
  },
  {
    id: "classe-abstraite",
    theme: "poo",
    term: "Classe abstraite",
    definition:
      "Classe marquée `abstract`, qu'on ne peut pas instancier ; elle sert de base à d'autres classes et peut déclarer des méthodes abstraites, sans corps, que les enfants doivent implémenter.",
    example:
      "abstract class Animal {\n  abstract cri(): string;\n  presenter() {\n    return `Je fais ${this.cri()}`;\n  }\n}\nclass Chat extends Animal {\n  cri() {\n    return \"Miaou\";\n  }\n}",
    pitfall: "Une classe enfant non abstraite doit implémenter toutes les méthodes abstraites, sinon erreur.",
    related: ["heritage", "implements"],
  },
  {
    id: "implements",
    theme: "poo",
    term: "implements",
    definition: "`class A implements I` vérifie que la classe respecte le contrat de l'interface `I`. Une classe peut implémenter plusieurs interfaces.",
    example: 'interface Volant {\n  voler(): string;\n}\ninterface Nageur {\n  nager(): string;\n}\nclass Canard implements Volant, Nageur {\n  voler() {\n    return "vole";\n  }\n  nager() {\n    return "nage";\n  }\n}',
    pitfall: "`implements` ne fournit aucun code : il vérifie seulement. Les méthodes doivent toutes être écrites dans la classe.",
    related: ["interface", "classe-abstraite", "polymorphisme"],
  },
  {
    id: "encapsulation",
    theme: "poo",
    term: "Encapsulation",
    definition: "Cacher l'état interne d'un objet et n'exposer que des méthodes contrôlées pour le lire ou le modifier, afin de garantir sa cohérence.",
    example:
      'class Compte {\n  #solde = 0;\n  retirer(n: number) {\n    if (n > this.#solde) throw new Error("Solde insuffisant");\n    this.#solde -= n;\n  }\n}',
    pitfall: "Des getters et setters qui exposent tout sans aucune règle n'apportent pas d'encapsulation réelle.",
    related: ["public-private", "champ-prive", "getter-setter"],
  },
  {
    id: "polymorphisme",
    theme: "poo",
    term: "Polymorphisme",
    definition: "La capacité d'objets de classes différentes à être utilisés via un même type, chacun réagissant avec sa propre implémentation.",
    example:
      'interface Forme {\n  aire(): number;\n}\nconst formes: Forme[] = [\n  { aire: () => 4 },\n  { aire: () => Math.PI },\n];\nformes.forEach((f) => console.log(f.aire()));',
    pitfall: "Tester le type concret avec des `instanceof` partout va à l'encontre du polymorphisme.",
    related: ["override", "implements", "heritage"],
  },
  {
    id: "composition",
    theme: "poo",
    term: "Composition vs héritage",
    definition:
      "Héritage : « est un » (un `Chien` est un `Animal`). Composition : « a un » (une `Voiture` a un `Moteur`), en stockant d'autres objets comme propriétés. La composition est souvent plus souple.",
    example:
      'class Moteur {\n  demarrer() {\n    return "vroum";\n  }\n}\nclass Voiture {\n  constructor(private moteur: Moteur) {}\n  rouler() {\n    return this.moteur.demarrer();\n  }\n}\nnew Voiture(new Moteur()).rouler();',
    pitfall: "Les hiérarchies d'héritage profondes deviennent rigides : une modification du parent se répercute partout.",
    related: ["heritage", "encapsulation"],
  },
  {
    id: "getter-setter",
    theme: "poo",
    term: "Getter / setter",
    definition:
      "`get` et `set` définissent des accesseurs : on les utilise comme des propriétés (`obj.aire`, `obj.taille = 3`) mais ils exécutent une méthode.",
    example:
      'class Temperature {\n  #celsius = 0;\n  get fahrenheit() {\n    return this.#celsius * 1.8 + 32;\n  }\n  set celsius(v: number) {\n    if (v < -273.15) throw new Error("Impossible");\n    this.#celsius = v;\n  }\n}',
    pitfall: "Un getter sans setter crée une propriété en lecture seule : l'affecter est une erreur.",
    related: ["encapsulation", "champ-prive"],
  },
];
