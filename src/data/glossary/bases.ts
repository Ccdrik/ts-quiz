import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "valeur",
    theme: "bases",
    term: "Valeur",
    definition:
      "Une donnée manipulée par le programme : un nombre, un texte, un booléen, un objet… Toute expression produit une valeur.",
    example: 'const age = 30; // 30 est une valeur\nconst majeur = age >= 18; // l\'expression produit la valeur true',
    pitfall: "Ne pas confondre la valeur et la variable qui la contient : plusieurs variables peuvent désigner la même valeur (objet).",
    related: ["litteral", "variable", "expression-instruction"],
  },
  {
    id: "litteral",
    theme: "bases",
    term: "Littéral",
    definition:
      "Une valeur écrite directement dans le code : `42`, `\"Bonjour\"`, `true`, `[1, 2]`, `{ x: 0 }`.",
    example: 'const n = 42; // littéral numérique\nconst s = "Bonjour"; // littéral de chaîne\nconst o = { x: 0 }; // littéral d\'objet',
    pitfall: "En TypeScript, « type littéral » désigne autre chose : un type qui n'accepte qu'une valeur précise, comme `\"rouge\"`.",
    related: ["valeur", "type-litteral"],
  },
  {
    id: "variable",
    theme: "bases",
    term: "Variable (let, const, var)",
    definition:
      "Un nom qui désigne une valeur. `let` : réaffectable, portée de bloc. `const` : non réaffectable, portée de bloc. `var` : ancienne syntaxe, portée de fonction, à éviter.",
    example: "let score = 0;\nscore = score + 1;\nconst MAX = 10;",
    pitfall:
      "`var` a une portée de fonction et non de bloc : une variable `var` déclarée dans un `if` est visible en dehors.",
    related: ["constante", "declaration", "reaffectation", "portee"],
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
    id: "declaration",
    theme: "bases",
    term: "Déclaration / initialisation",
    definition:
      "Déclarer, c'est créer un nom (`let x`). Initialiser, c'est lui donner sa première valeur (`let x = 0`). On peut faire les deux en une seule instruction.",
    example: "let total: number; // déclaration seule\ntotal = 0; // initialisation\nconst nom = \"Léa\"; // déclaration + initialisation",
    pitfall: "Une `const` doit toujours être initialisée dans sa déclaration : `const x;` est une erreur.",
    related: ["variable", "reaffectation"],
  },
  {
    id: "reaffectation",
    theme: "bases",
    term: "Affectation / réaffectation",
    definition:
      "Affecter, c'est donner une valeur à une variable avec `=`. Réaffecter, c'est remplacer sa valeur par une nouvelle. Possible avec `let`, interdit avec `const`.",
    example: 'let ville = "Lyon"; // affectation initiale\nville = "Nantes"; // réaffectation',
    pitfall:
      "Ne pas confondre `=` (affectation) avec `===` (comparaison) dans une condition.",
    related: ["variable", "constante", "declaration"],
  },
  {
    id: "expression-instruction",
    theme: "bases",
    term: "Expression vs instruction",
    definition:
      "Une expression produit une valeur (`a + b`, `f(x)`, `x > 0`). Une instruction effectue une action (`let`, `if`, `for`, `return`) et ne produit pas de valeur.",
    example: "const a = 2;\nconst b = 3;\nconst somme = a + b; // a + b est une expression\nif (somme > 4) {} // if est une instruction",
    pitfall: "On ne peut pas mettre une instruction là où une expression est attendue : `const x = if (...)` est invalide ; utilise le ternaire.",
    related: ["valeur", "operateur-operande", "ternaire"],
  },
  {
    id: "operateur-operande",
    theme: "bases",
    term: "Opérateur / opérande",
    definition:
      "Un opérateur est un symbole qui effectue une opération (`+`, `*`, `===`, `&&`). Les opérandes sont les valeurs sur lesquelles il agit.",
    example: "const prix = 10;\nconst total = prix * 3; // * est l'opérateur, prix et 3 sont les opérandes\nconst reste = 10 % 3; // modulo : 1",
    pitfall: "`+` concatène dès qu'un opérande est une chaîne : `\"1\" + 2` donne `\"12\"`, pas `3`.",
    related: ["expression-instruction", "egalite-stricte", "operateurs-logiques"],
  },
  {
    id: "egalite-stricte",
    theme: "bases",
    term: "== vs ===",
    definition:
      "`===` (égalité stricte) compare valeur et type sans conversion. `==` convertit les types avant de comparer, avec des règles surprenantes. Utilise toujours `===` et `!==`.",
    example: "const a: unknown = \"5\";\nconsole.log(a === 5); // false : types différents",
    pitfall: "En JavaScript, `\"5\" == 5`, `0 == \"\"` et `null == undefined` valent tous `true`.",
    related: ["operateur-operande", "truthy-falsy"],
  },
  {
    id: "operateurs-logiques",
    theme: "bases",
    term: "Opérateurs logiques (&&, ||, !)",
    definition:
      "`&&` (ET) : vrai si les deux opérandes sont vrais. `||` (OU) : vrai si au moins un l'est. `!` (NON) : inverse un booléen. `&&` et `||` s'arrêtent dès que le résultat est connu.",
    example: "const age = 20;\nconst membre = true;\nconst accesVIP = age >= 18 && membre;\nconst refuse = !accesVIP;",
    pitfall: "`||` renvoie le premier opérande truthy : `0 || 10` vaut `10`, même si `0` était une valeur voulue. Utilise `??` dans ce cas.",
    related: ["truthy-falsy", "nullish", "condition"],
  },
  {
    id: "ternaire",
    theme: "bases",
    term: "Opérateur ternaire (? :)",
    definition:
      "`condition ? valeurSiVrai : valeurSiFaux` : une expression qui choisit entre deux valeurs. C'est le seul opérateur à trois opérandes.",
    example: 'const age = 16;\nconst statut = age >= 18 ? "majeur" : "mineur";',
    pitfall: "Imbriquer plusieurs ternaires rend le code illisible : préfère un `if` ou un `switch`.",
    related: ["condition", "expression-instruction"],
  },
  {
    id: "nullish",
    theme: "bases",
    term: "?? (coalescence des nuls)",
    definition:
      "`a ?? b` renvoie `b` seulement si `a` vaut `null` ou `undefined`, sinon `a`. Idéal pour une valeur par défaut.",
    example: "function volume(v: number | undefined) {\n  return v ?? 50; // 0 reste 0\n}",
    pitfall: "Ne pas confondre avec `||`, qui remplace aussi `0`, `\"\"` et `false`.",
    related: ["operateurs-logiques", "chainage-optionnel", "truthy-falsy"],
  },
  {
    id: "chainage-optionnel",
    theme: "bases",
    term: "?. (chaînage optionnel)",
    definition:
      "`a?.b` accède à `b` seulement si `a` n'est ni `null` ni `undefined` ; sinon toute l'expression vaut `undefined` au lieu de lever une erreur.",
    example:
      "interface User { adresse?: { ville: string } }\nfunction ville(u: User) {\n  return u.adresse?.ville ?? \"inconnue\";\n}",
    pitfall: "Abuser de `?.` masque des données manquantes qu'il faudrait peut-être signaler.",
    related: ["nullish"],
  },
  {
    id: "condition",
    theme: "bases",
    term: "Condition (if / else, switch)",
    definition:
      "Une structure qui exécute un bloc de code seulement si une expression est vraie (`if`), avec une alternative (`else`) ou plusieurs cas (`switch`).",
    example: 'const note = 14;\nif (note >= 10) {\n  console.log("reçu");\n} else {\n  console.log("recalé");\n}',
    pitfall: "Dans un `switch`, oublier `break` fait exécuter les cas suivants (fallthrough).",
    related: ["truthy-falsy", "ternaire", "boucle"],
  },
  {
    id: "boucle",
    theme: "bases",
    term: "Boucle / itération (for, while)",
    definition:
      "Une boucle répète un bloc de code ; chaque passage est une itération. `for` : nombre de tours connu. `while` : tant qu'une condition est vraie.",
    example: "for (let i = 0; i < 3; i++) {\n  console.log(i); // 0, 1, 2\n}\nlet n = 3;\nwhile (n > 0) {\n  n--;\n}",
    pitfall: "Une condition de `while` qui ne devient jamais fausse crée une boucle infinie.",
    related: ["for-of-in", "condition"],
  },
  {
    id: "for-of-in",
    theme: "bases",
    term: "for...of vs for...in",
    definition:
      "`for...of` parcourt les valeurs d'un itérable (tableau, chaîne, Map). `for...in` parcourt les clés (noms de propriétés) d'un objet, sous forme de chaînes.",
    example:
      'const fruits = ["pomme", "kiwi"];\nfor (const f of fruits) console.log(f); // "pomme", "kiwi"\nfor (const i in fruits) console.log(i); // "0", "1"',
    pitfall: "Utiliser `for...in` sur un tableau donne les indices en `string`, pas les valeurs.",
    related: ["boucle", "tableau"],
  },
  {
    id: "portee",
    theme: "bases",
    term: "Portée (scope)",
    definition:
      "La zone du code où un nom est accessible. Globale : partout. De fonction : dans la fonction. De bloc : entre les accolades `{ }` où `let` / `const` sont déclarées.",
    example: "const globale = 1;\nfunction f() {\n  const locale = 2;\n  if (true) {\n    const bloc = 3;\n    return globale + locale + bloc;\n  }\n}",
    pitfall: "Une variable `let` ou `const` déclarée dans un `if` ou une boucle n'existe plus après l'accolade fermante.",
    related: ["hoisting", "shadowing", "variable", "closure"],
  },
  {
    id: "hoisting",
    theme: "bases",
    term: "Hoisting (remontée)",
    definition:
      "Les déclarations sont « remontées » en haut de leur portée avant l'exécution. Une fonction déclarée peut donc être appelée avant sa ligne ; une `var` vaut `undefined` avant son affectation.",
    example: "direBonjour(); // fonctionne grâce au hoisting\nfunction direBonjour() {\n  console.log(\"Bonjour\");\n}",
    pitfall: "`let` et `const` sont aussi remontées mais inaccessibles avant leur déclaration (zone morte temporelle) : erreur à l'exécution.",
    related: ["portee", "variable", "fonction-declaree"],
  },
  {
    id: "shadowing",
    theme: "bases",
    term: "Shadowing (masquage)",
    definition:
      "Déclarer, dans une portée intérieure, une variable du même nom qu'une variable extérieure : la variable intérieure masque l'autre dans son bloc.",
    example: 'const nom = "global";\nfunction f() {\n  const nom = "local"; // masque la variable globale\n  return nom; // "local"\n}',
    pitfall: "Le shadowing involontaire crée des bugs : on croit modifier la variable extérieure alors qu'on agit sur la copie locale.",
    related: ["portee"],
  },
  {
    id: "mutabilite",
    theme: "bases",
    term: "Mutable / immuable",
    definition:
      "Une valeur mutable peut être modifiée après sa création (objets, tableaux). Une valeur immuable ne peut pas l'être (les primitifs comme `string` ou `number`).",
    example: "const tab = [1, 2];\ntab.push(3); // le tableau est muté\nconst copie = [...tab, 4]; // nouvelle valeur, tab inchangé",
    pitfall:
      "Les méthodes de chaîne comme `toUpperCase()` ne modifient jamais la chaîne : elles en renvoient une nouvelle.",
    related: ["constante", "reference-copie", "readonly"],
  },
  {
    id: "reference-copie",
    theme: "bases",
    term: "Référence vs copie",
    definition:
      "Les primitifs sont copiés lors d'une affectation. Les objets et tableaux ne le sont pas : la variable contient une référence vers le même objet en mémoire.",
    example: "const a = { score: 1 };\nconst b = a; // même objet\nb.score = 99; // a.score vaut aussi 99\nconst c = { ...a }; // copie superficielle",
    pitfall: "La copie avec `{ ...obj }` est superficielle : les objets imbriqués restent partagés. Utilise `structuredClone` pour une copie profonde.",
    related: ["mutabilite", "spread-rest"],
  },
  {
    id: "truthy-falsy",
    theme: "bases",
    term: "Truthy / falsy",
    definition:
      "Dans une condition, toute valeur est convertie en booléen. Sont falsy : `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined`, `NaN`. Toutes les autres sont truthy.",
    example: 'const nom = "";\nif (nom) {\n  console.log("rempli");\n} else {\n  console.log("vide"); // affiché : "" est falsy\n}',
    pitfall: "Un tableau vide `[]` et un objet vide `{}` sont truthy.",
    related: ["condition", "operateurs-logiques", "nullish"],
  },
];
