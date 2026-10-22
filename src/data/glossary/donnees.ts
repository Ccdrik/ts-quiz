import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "types-primitifs",
    theme: "donnees",
    term: "Types primitifs vs objets",
    definition:
      "Les primitifs sont des valeurs simples et immuables : `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`. Tout le reste (objets, tableaux, fonctions) est un objet, manipulé par référence.",
    example:
      'const s: string = "texte";\nconst n: number = 3.14;\nconst b: boolean = true;\nconst grand: bigint = 9007199254740993n;\nconst id: symbol = Symbol("id");',
    pitfall: "En TypeScript, utilise `string`, `number`, `boolean` en minuscules : `String`, `Number`, `Boolean` désignent les objets enveloppes.",
    related: ["null-undefined", "objet", "reference-copie"],
  },
  {
    id: "null-undefined",
    theme: "donnees",
    term: "null vs undefined",
    definition:
      "`undefined` : valeur absente par défaut (variable non initialisée, propriété inexistante, fonction sans `return`). `null` : absence de valeur voulue, affectée explicitement.",
    example: "let a: string | undefined; // undefined\nlet b: string | null = null; // absence voulue",
    pitfall: "`typeof null` vaut `\"object\"` : c'est un bug historique de JavaScript.",
    related: ["types-primitifs", "nullish", "strict-null-checks"],
  },
  {
    id: "objet",
    theme: "donnees",
    term: "Objet, propriété, clé",
    definition:
      "Un objet regroupe des propriétés : des paires clé → valeur. La clé est le nom (chaîne ou symbol), la valeur peut être de n'importe quel type.",
    example: 'const joueur = {\n  nom: "Zidane", // clé "nom", valeur "Zidane"\n  numero: 10,\n};\njoueur.numero = 5;',
    pitfall: "Accéder à une propriété qui n'existe pas renvoie `undefined` en JavaScript ; TypeScript le signale si le type de l'objet est connu.",
    related: ["methode", "notation-point-crochets", "interface"],
  },
  {
    id: "methode",
    theme: "donnees",
    term: "Méthode",
    definition: "Une propriété dont la valeur est une fonction. Elle s'appelle avec `objet.methode()` et peut utiliser `this` pour accéder à l'objet.",
    example: 'const chien = {\n  nom: "Rex",\n  aboyer() {\n    return `${this.nom} : Wouf`;\n  },\n};\nchien.aboyer();',
    pitfall: "Oublier les parenthèses : `chien.aboyer` désigne la fonction, `chien.aboyer()` l'exécute.",
    related: ["objet", "this"],
  },
  {
    id: "notation-point-crochets",
    theme: "donnees",
    term: "Notation point vs crochets",
    definition:
      "`obj.cle` : la clé est écrite en dur et doit être un identifiant valide. `obj[\"cle\"]` ou `obj[variable]` : la clé est une expression, utile pour une clé dynamique ou contenant des espaces.",
    example:
      'const scores: Record<string, number> = { "Léa B.": 12 };\nconst nom = "Léa B.";\nconsole.log(scores[nom]);',
    pitfall: "`obj.variable` cherche la propriété nommée littéralement « variable », pas la valeur de la variable.",
    related: ["objet", "signature-index"],
  },
  {
    id: "tableau",
    theme: "donnees",
    term: "Tableau",
    definition:
      "Liste ordonnée de valeurs, accessibles par leur index. Type `T[]` ou `Array<T>`. Sa propriété `length` donne le nombre d'éléments.",
    example: "const notes: number[] = [12, 15, 9];\nnotes.push(18);\nconsole.log(notes.length); // 4",
    pitfall:
      "Accéder à un index qui n'existe pas renvoie `undefined` sans erreur à l'exécution.",
    related: ["index", "tuple", "map"],
  },
  {
    id: "index",
    theme: "donnees",
    term: "Index",
    definition: "La position d'un élément dans un tableau, à partir de 0. Le dernier élément est à l'index `length - 1`.",
    example: 'const lettres = ["a", "b", "c"];\nlettres[0]; // "a"\nlettres[lettres.length - 1]; // "c"\nlettres.at(-1); // "c"',
    pitfall: "Par défaut, TypeScript type `tab[i]` comme `T` et non `T | undefined` : active `noUncheckedIndexedAccess` pour plus de sûreté.",
    related: ["tableau"],
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
    related: ["tableau", "destructuration", "as-const"],
  },
  {
    id: "map",
    theme: "donnees",
    term: "map()",
    definition:
      "Méthode de tableau qui applique une fonction à chaque élément et renvoie un nouveau tableau de même longueur.",
    example: "const prix = [10, 20];\nconst ttc = prix.map((p) => p * 1.2); // [12, 24]",
    pitfall:
      "`map` ne modifie pas le tableau d'origine ; pour simplement parcourir sans rien produire, utilise `for...of` ou `forEach`.",
    related: ["filter", "reduce", "callback"],
  },
  {
    id: "filter",
    theme: "donnees",
    term: "filter()",
    definition: "Renvoie un nouveau tableau contenant seulement les éléments pour lesquels le callback renvoie une valeur truthy.",
    example: "const nombres = [1, 2, 3, 4];\nconst pairs = nombres.filter((n) => n % 2 === 0); // [2, 4]",
    pitfall: "Pour que TypeScript restreigne le type (ex. retirer `null`), le callback doit être un type guard : `(x): x is T => x !== null`.",
    related: ["map", "find", "type-guard"],
  },
  {
    id: "reduce",
    theme: "donnees",
    term: "reduce()",
    definition:
      "Combine tous les éléments en une seule valeur en appelant un callback `(accumulateur, element) => nouvelAccumulateur`, à partir d'une valeur initiale.",
    example: "const total = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0); // 10",
    pitfall: "Sans valeur initiale, `reduce` sur un tableau vide lève une erreur. Donne toujours une valeur initiale.",
    related: ["map", "filter"],
  },
  {
    id: "find",
    theme: "donnees",
    term: "find()",
    definition: "Renvoie le premier élément qui satisfait le callback, ou `undefined` si aucun ne convient.",
    example: "const premier = [3, 8, 12].find((n) => n > 5); // 8, type number | undefined",
    pitfall: "Le résultat peut être `undefined` : vérifie-le avant de l'utiliser.",
    related: ["filter", "some-every"],
  },
  {
    id: "some-every",
    theme: "donnees",
    term: "some() / every()",
    definition:
      "`some` renvoie `true` si au moins un élément satisfait le callback. `every` renvoie `true` si tous le satisfont.",
    example: "const notes = [12, 8, 15];\nnotes.some((n) => n < 10); // true\nnotes.every((n) => n >= 10); // false",
    pitfall: "Sur un tableau vide, `every` renvoie `true` et `some` renvoie `false`.",
    related: ["find", "filter"],
  },
  {
    id: "destructuration",
    theme: "donnees",
    term: "Déstructuration",
    definition:
      "Syntaxe qui extrait des propriétés d'un objet ou des éléments d'un tableau dans des variables, en une seule instruction.",
    example: 'const joueur = { nom: "Kanté", poste: "milieu" };\nconst { nom, poste } = joueur;\nconst [premier, second] = [10, 20];',
    pitfall: "On ne peut pas annoter le type au milieu : `const { nom: string } = obj` renomme `nom` en `string` ! Écris `const { nom }: { nom: string } = obj`.",
    related: ["spread-rest", "objet", "tuple"],
  },
  {
    id: "spread-rest",
    theme: "donnees",
    term: "Spread / rest (...)",
    definition:
      "Spread : `...` étale un tableau ou un objet dans un autre (`[...a, 4]`, `{ ...obj, x: 1 }`). Rest : `...` rassemble le reste dans une déstructuration ou un paramètre.",
    example: "const a = [1, 2];\nconst b = [...a, 3]; // spread\nconst [premier, ...autres] = b; // rest\nconst base = { x: 1, y: 2 };\nconst copie = { ...base, y: 5 };",
    pitfall: "La copie par spread est superficielle : les objets imbriqués restent partagés.",
    related: ["destructuration", "parametre-rest", "reference-copie"],
  },
  {
    id: "json",
    theme: "donnees",
    term: "JSON / sérialisation",
    definition:
      "JSON est un format texte d'échange de données. Sérialiser = convertir une valeur en texte (`JSON.stringify`) ; désérialiser = reconstruire la valeur (`JSON.parse`).",
    example:
      'const texte = JSON.stringify({ nom: "Léa", age: 30 }); // \'{"nom":"Léa","age":30}\'\nconst objet: unknown = JSON.parse(texte);',
    pitfall: "`JSON.parse` renvoie `any` : type le résultat en `unknown` et valide-le. Les fonctions, `undefined` et les `Date` ne survivent pas à la sérialisation.",
    related: ["objet", "unknown"],
  },
];
