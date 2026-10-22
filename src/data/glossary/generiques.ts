import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "generique",
    theme: "generiques",
    term: "Générique",
    definition:
      "Fonction, classe ou type paramétré par un ou plusieurs types, réutilisable avec différents types tout en restant précisément typé.",
    example:
      "function identite<T>(x: T): T {\n  return x;\n}\nconst s = identite(\"a\"); // \"a\"\nconst liste: Array<number> = [1, 2];",
    pitfall: "Utiliser `any` au lieu d'un générique fait perdre le lien entre le type d'entrée et celui de sortie.",
    related: ["parametre-type", "contrainte", "utility-types"],
  },
  {
    id: "parametre-type",
    theme: "generiques",
    term: "Paramètre de type (<T>)",
    definition:
      "Le nom entre chevrons (`T`, `K`, `TItem`…) qui représente un type fourni plus tard, explicitement (`f<string>()`) ou par inférence à l'appel.",
    example: "function paire<A, B>(a: A, b: B): [A, B] {\n  return [a, b];\n}\nconst p = paire(\"x\", 1); // [string, number]\nconst q = paire<string, string>(\"a\", \"b\");",
    pitfall: "Un paramètre de type utilisé une seule fois dans la signature est souvent inutile : un type concret suffit.",
    related: ["generique", "type-defaut"],
  },
  {
    id: "contrainte",
    theme: "generiques",
    term: "Contrainte (extends)",
    definition:
      "Limite les types acceptés par un paramètre de type : `<T extends { length: number }>` n'accepte que les types ayant une propriété `length`.",
    example:
      "function plusLong<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}\nplusLong(\"abc\", \"de\");\nplusLong([1, 2], [3]);",
    pitfall:
      "Dans `<T extends X>`, `extends` signifie « est assignable à », pas « hérite de la classe ».",
    related: ["generique", "keyof"],
  },
  {
    id: "type-defaut",
    theme: "generiques",
    term: "Valeur par défaut d'un paramètre de type",
    definition: "`<T = Defaut>` : le type utilisé quand aucun argument de type n'est fourni ni inféré.",
    example: "interface Reponse<T = unknown> {\n  data: T;\n  status: number;\n}\nconst r: Reponse = { data: null, status: 200 }; // T = unknown",
    pitfall: "Les paramètres avec valeur par défaut doivent venir après ceux qui n'en ont pas.",
    related: ["parametre-type"],
  },
  {
    id: "keyof",
    theme: "generiques",
    term: "keyof",
    definition: "Opérateur de type qui produit l'union des clés d'un type objet.",
    example:
      "interface User {\n  nom: string;\n  age: number;\n}\ntype Cle = keyof User; // \"nom\" | \"age\"\nfunction lire<T, K extends keyof T>(obj: T, cle: K): T[K] {\n  return obj[cle];\n}",
    pitfall: "Sur un type avec signature d'index `string`, `keyof` donne `string | number` (les clés numériques sont converties en chaînes).",
    related: ["indexed-access", "mapped-types", "typeof-type"],
  },
  {
    id: "typeof-type",
    theme: "generiques",
    term: "typeof en position de type",
    definition:
      "Dans une annotation, `typeof valeur` récupère le type d'une variable existante. À ne pas confondre avec le `typeof` de JavaScript, qui renvoie une chaîne à l'exécution.",
    example: 'const config = { port: 3000, mode: "dev" };\ntype Config = typeof config; // { port: number; mode: string }\nfunction init(c: Config) {\n  return c.port;\n}',
    pitfall: "`typeof` en position de type ne s'applique qu'à des noms de valeurs, pas à des expressions comme `typeof f()`.",
    related: ["keyof", "as-const", "return-type-parameters"],
  },
  {
    id: "indexed-access",
    theme: "generiques",
    term: "Indexed access (T[\"cle\"])",
    definition: "Récupère le type d'une propriété d'un autre type : `User[\"nom\"]`. Fonctionne aussi avec une union de clés ou `number` pour les tableaux.",
    example:
      'interface User {\n  nom: string;\n  roles: string[];\n}\ntype Nom = User["nom"]; // string\ntype Role = User["roles"][number]; // string',
    pitfall: "On écrit `User[\"nom\"]` et non `User.nom` : la notation point n'existe pas pour les types.",
    related: ["keyof", "mapped-types"],
  },
  {
    id: "mapped-types",
    theme: "generiques",
    term: "Mapped types",
    definition:
      "Construit un nouveau type objet en parcourant des clés : `{ [K in keyof T]: … }`. Les modificateurs `?`, `readonly`, `-?` et `-readonly` ajoutent ou retirent des options.",
    example: "type Optionnel<T> = { [K in keyof T]?: T[K] };\ntype Booleens<T> = { [K in keyof T]: boolean };\ntype Etat = Booleens<{ nom: string; age: number }>; // { nom: boolean; age: boolean }",
    pitfall: "Oublier `keyof` : `[K in T]` n'a de sens que si `T` est une union de clés.",
    related: ["keyof", "indexed-access", "partial"],
  },
  {
    id: "conditional-types",
    theme: "generiques",
    term: "Conditional types",
    definition: "`T extends U ? X : Y` : choisit un type selon que `T` est assignable à `U`. Appliqué à une union, il se distribue sur chaque membre.",
    example: 'type EstString<T> = T extends string ? "oui" : "non";\ntype A = EstString<"a">; // "oui"\ntype B = EstString<42>; // "non"\ntype C = EstString<"a" | 1>; // "oui" | "non"',
    pitfall: "La distribution sur les unions surprend : pour l'éviter, entoure de crochets `[T] extends [U]`.",
    related: ["infer", "exclude-extract"],
  },
  {
    id: "infer",
    theme: "generiques",
    term: "infer",
    definition: "Dans un conditional type, `infer X` déclare une variable de type que TypeScript déduit lors de la comparaison.",
    example: "type Element<T> = T extends (infer U)[] ? U : never;\ntype E = Element<string[]>; // string\ntype Retour<F> = F extends (...args: never[]) => infer R ? R : never;",
    pitfall: "`infer` n'est utilisable que dans la partie `extends` d'un conditional type.",
    related: ["conditional-types", "return-type-parameters"],
  },
  {
    id: "template-literal-types",
    theme: "generiques",
    term: "Template literal types",
    definition: "Types de chaînes construits comme des template strings : `` `on${Evenement}` ``. Avec une union, toutes les combinaisons sont générées.",
    example: 'type Evenement = "click" | "focus";\ntype Gestionnaire = `on${Capitalize<Evenement>}`; // "onClick" | "onFocus"',
    pitfall: "Plusieurs grandes unions combinées produisent un nombre de cas qui explose (produit cartésien).",
    related: ["type-litteral", "union"],
  },
  {
    id: "utility-types",
    theme: "generiques",
    term: "Utility types",
    definition:
      "Types génériques fournis par TypeScript pour transformer d'autres types : `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `NonNullable`, `ReturnType`, `Parameters`, `Awaited`…",
    example:
      "interface User {\n  id: number;\n  nom: string;\n}\ntype Brouillon = Partial<User>; // { id?: number; nom?: string }",
    pitfall: "Ils sont écrits avec des mapped types et des conditional types : lire leur définition (Ctrl+clic) aide à les comprendre.",
    related: ["partial", "pick-omit", "exclude-extract", "return-type-parameters"],
  },
  {
    id: "partial",
    theme: "generiques",
    term: "Partial / Required",
    definition: "`Partial<T>` rend toutes les propriétés de `T` optionnelles. `Required<T>` fait l'inverse : toutes deviennent obligatoires.",
    example:
      "interface Options {\n  couleur?: string;\n  taille: number;\n}\nconst maj: Partial<Options> = { taille: 2 };\nconst complet: Required<Options> = { couleur: \"red\", taille: 2 };",
    pitfall: "`Partial` n'agit qu'au premier niveau : les objets imbriqués restent obligatoires.",
    related: ["utility-types", "mapped-types"],
  },
  {
    id: "readonly-utility",
    theme: "generiques",
    term: "Readonly<T>",
    definition: "Rend toutes les propriétés de `T` en lecture seule (`readonly`).",
    example: "interface Point {\n  x: number;\n}\nconst p: Readonly<Point> = { x: 1 };\n// @ts-expect-error propriété en lecture seule\np.x = 2;",
    pitfall: "Comme `readonly`, il est superficiel et n'existe qu'à la compilation.",
    related: ["readonly", "utility-types"],
  },
  {
    id: "pick-omit",
    theme: "generiques",
    term: "Pick / Omit",
    definition: "`Pick<T, K>` garde seulement les propriétés `K` de `T`. `Omit<T, K>` garde toutes les propriétés sauf `K`.",
    example:
      "interface User {\n  id: number;\n  nom: string;\n  motDePasse: string;\n}\ntype Apercu = Pick<User, \"id\" | \"nom\">;\ntype Public = Omit<User, \"motDePasse\">;",
    pitfall: "`Omit` accepte n'importe quelle chaîne comme clé : une faute de frappe passe inaperçue, contrairement à `Pick`.",
    related: ["utility-types", "keyof"],
  },
  {
    id: "exclude-extract",
    theme: "generiques",
    term: "Exclude / Extract",
    definition: "Opèrent sur des unions : `Exclude<U, X>` retire les membres assignables à `X`, `Extract<U, X>` ne garde que ceux-là.",
    example: 'type Couleur = "rouge" | "vert" | "bleu";\ntype SansRouge = Exclude<Couleur, "rouge">; // "vert" | "bleu"\ntype Chaines = Extract<string | number | boolean, string>; // string',
    pitfall: "Ne pas confondre `Exclude` (sur une union) et `Omit` (sur les propriétés d'un objet).",
    related: ["conditional-types", "non-nullable", "pick-omit"],
  },
  {
    id: "non-nullable",
    theme: "generiques",
    term: "NonNullable<T>",
    definition: "Retire `null` et `undefined` d'un type.",
    example: "type Peut = string | null | undefined;\ntype Sur = NonNullable<Peut>; // string",
    pitfall: "Il agit sur le type, pas sur la valeur : il faut toujours vérifier la valeur à l'exécution.",
    related: ["exclude-extract", "strict-null-checks"],
  },
  {
    id: "return-type-parameters",
    theme: "generiques",
    term: "ReturnType / Parameters",
    definition: "`ReturnType<F>` extrait le type de retour d'un type fonction ; `Parameters<F>` extrait le tuple de ses paramètres.",
    example:
      "function creer(nom: string, age: number) {\n  return { nom, age };\n}\ntype Cree = ReturnType<typeof creer>; // { nom: string; age: number }\ntype Args = Parameters<typeof creer>; // [nom: string, age: number]",
    pitfall: "Ils attendent un type, pas une valeur : écris `ReturnType<typeof creer>`, pas `ReturnType<creer>`.",
    related: ["infer", "typeof-type", "awaited"],
  },
  {
    id: "awaited",
    theme: "generiques",
    term: "Awaited<T>",
    definition: "Le type obtenu après `await` : il « déballe » les `Promise`, même imbriquées.",
    example: "async function charger() {\n  return 42;\n}\ntype Resultat = Awaited<ReturnType<typeof charger>>; // number",
    pitfall: "`ReturnType` d'une fonction `async` donne `Promise<T>` : ajoute `Awaited` pour obtenir `T`.",
    related: ["return-type-parameters", "promise"],
  },
  {
    id: "variance",
    theme: "generiques",
    term: "Covariance / contravariance",
    definition:
      "Covariance : si `Chat` est un `Animal`, alors un `Chat[]` peut servir de `Animal[]` (le sens est conservé). Contravariance : pour les paramètres de fonction, le sens s'inverse : une fonction qui accepte n'importe quel `Animal` peut servir là où l'on attend une fonction acceptant un `Chat`.",
    example:
      "type Animal = { nom: string };\ntype Chat = Animal & { miauler(): void };\nconst chats: Chat[] = [];\nconst animaux: Animal[] = chats; // covariance\nconst caresser = (a: Animal) => console.log(a.nom);\nconst pourChat: (c: Chat) => void = caresser; // contravariance",
    pitfall: "Les tableaux sont covariants même s'ils sont modifiables : `animaux.push(unChien)` compilerait et mettrait un chien parmi les chats.",
    related: ["generique", "typage-structurel"],
  },
];
