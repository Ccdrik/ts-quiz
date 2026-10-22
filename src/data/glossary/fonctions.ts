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
    related: ["argument", "signature", "parametre-optionnel"],
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
    id: "signature",
    theme: "fonctions",
    term: "Signature / corps",
    definition:
      "La signature décrit comment appeler une fonction : son nom, ses paramètres et leurs types, son type de retour. Le corps est le bloc `{ }` qui contient les instructions.",
    example:
      "// signature : (a: number, b: number) => number\nfunction add(a: number, b: number): number {\n  return a + b; // corps\n}\ntype Operation = (a: number, b: number) => number;",
    pitfall: "Dans un type fonction, les noms des paramètres sont obligatoires : `(number) => number` signifie un paramètre nommé `number` de type `any`.",
    related: ["parametre", "type-de-retour", "surcharge"],
  },
  {
    id: "type-de-retour",
    theme: "fonctions",
    term: "Valeur / type de retour",
    definition:
      "La valeur de retour est ce que renvoie `return`. Son type, écrit après les paramètres, est inféré s'il est omis.",
    example: "function carre(n: number): number {\n  return n * n;\n}",
    pitfall:
      "Une fonction sans `return` renvoie `undefined` à l'exécution, mais son type de retour est `void`.",
    related: ["void-never", "signature"],
  },
  {
    id: "void-never",
    theme: "fonctions",
    term: "void vs undefined vs never",
    definition:
      "`void` : la fonction ne renvoie rien d'utile. `undefined` : elle renvoie explicitement la valeur `undefined`. `never` : elle ne se termine jamais normalement (elle lève une erreur ou boucle à l'infini).",
    example:
      "function log(m: string): void {\n  console.log(m);\n}\nfunction echouer(m: string): never {\n  throw new Error(m);\n}",
    pitfall: "Une fonction déclarée qui lève toujours une erreur est inférée `void` : annote `never` explicitement si c'est voulu.",
    related: ["type-de-retour", "never"],
  },
  {
    id: "parametre-optionnel",
    theme: "fonctions",
    term: "Paramètre optionnel (?)",
    definition:
      "Un paramètre suivi de `?` peut être omis à l'appel ; il vaut alors `undefined` et son type inclut `undefined`.",
    example: 'function saluer(nom?: string) {\n  return `Bonjour ${nom ?? "invité"}`;\n}\nsaluer();',
    pitfall: "Un paramètre optionnel doit être placé après tous les paramètres obligatoires.",
    related: ["parametre-defaut", "parametre"],
  },
  {
    id: "parametre-defaut",
    theme: "fonctions",
    term: "Paramètre par défaut",
    definition:
      "Un paramètre avec `= valeur` prend cette valeur quand l'argument est omis ou vaut `undefined`. Son type est inféré à partir de la valeur.",
    example: "function puissance(base: number, exp = 2) {\n  return base ** exp;\n}\npuissance(3); // 9",
    pitfall: "La valeur par défaut ne s'applique pas si on passe `null` : seul `undefined` la déclenche.",
    related: ["parametre-optionnel"],
  },
  {
    id: "parametre-rest",
    theme: "fonctions",
    term: "Paramètre rest (...args)",
    definition:
      "`...nom` regroupe tous les arguments restants dans un tableau. Il doit être le dernier paramètre.",
    example: "function somme(...nombres: number[]) {\n  return nombres.reduce((a, b) => a + b, 0);\n}\nsomme(1, 2, 3); // 6",
    pitfall: "Même syntaxe `...` que le spread, mais rôle inverse : le rest rassemble, le spread étale.",
    related: ["spread-rest", "parametre"],
  },
  {
    id: "fonction-declaree",
    theme: "fonctions",
    term: "Fonction déclarée vs expression de fonction",
    definition:
      "Une fonction déclarée commence par `function nom()` ; elle est remontée (hoisting). Une expression de fonction est une fonction affectée à une variable : elle n'existe qu'après cette ligne.",
    example: "function declaree() {\n  return 1;\n}\nconst expression = function () {\n  return 2;\n};",
    pitfall: "Appeler une expression de fonction avant sa déclaration provoque une erreur.",
    related: ["fonction-flechee", "fonction-anonyme", "hoisting"],
  },
  {
    id: "fonction-flechee",
    theme: "fonctions",
    term: "Fonction fléchée",
    definition:
      "Syntaxe courte `(params) => expression` pour écrire une fonction. Elle n'a pas son propre `this` : elle reprend celui du code qui l'entoure.",
    example: "const double = (n: number): number => n * 2;",
    pitfall:
      "Pour renvoyer un objet littéral, il faut des parenthèses : `() => ({ a: 1 })`, sinon les accolades sont lues comme un bloc.",
    related: ["fonction-declaree", "this", "fonction-anonyme"],
  },
  {
    id: "fonction-anonyme",
    theme: "fonctions",
    term: "Fonction anonyme",
    definition: "Une fonction sans nom, souvent écrite directement là où elle est utilisée (par exemple comme callback).",
    example: "setTimeout(function () {\n  console.log(\"fini\");\n}, 1000);\n[1, 2].map((n) => n + 1); // fléchée anonyme",
    pitfall: "Les fonctions anonymes apparaissent sans nom dans les messages d'erreur : nomme celles qui sont complexes.",
    related: ["callback", "fonction-flechee"],
  },
  {
    id: "callback",
    theme: "fonctions",
    term: "Callback (fonction de rappel)",
    definition:
      "Une fonction passée en argument à une autre fonction, qui l'appellera au bon moment (à chaque élément, à la fin d'une tâche…).",
    example: "function repeter(n: number, action: (i: number) => void) {\n  for (let i = 0; i < n; i++) action(i);\n}\nrepeter(3, (i) => console.log(i));",
    pitfall: "Passer `f()` au lieu de `f` : on passe alors le résultat de l'appel, pas la fonction.",
    related: ["ordre-superieur", "fonction-anonyme", "promise"],
  },
  {
    id: "ordre-superieur",
    theme: "fonctions",
    term: "Fonction d'ordre supérieur",
    definition: "Une fonction qui prend une fonction en paramètre ou qui renvoie une fonction. `map`, `filter` et `reduce` en sont des exemples.",
    example: "function multiplierPar(k: number) {\n  return (n: number) => n * k;\n}\nconst triple = multiplierPar(3);\ntriple(5); // 15",
    pitfall: "Le type du callback attendu doit être précis, sinon les paramètres du callback sont inférés `any`.",
    related: ["callback", "closure", "map"],
  },
  {
    id: "closure",
    theme: "fonctions",
    term: "Closure (fermeture)",
    definition:
      "Une fonction qui garde accès aux variables de la portée où elle a été créée, même après la fin de la fonction englobante.",
    example: "function compteur() {\n  let n = 0;\n  return () => ++n;\n}\nconst suivant = compteur();\nsuivant(); // 1\nsuivant(); // 2",
    pitfall: "Avec `var` dans une boucle, toutes les closures partagent la même variable ; `let` crée une variable par itération.",
    related: ["portee", "ordre-superieur"],
  },
  {
    id: "fonction-pure",
    theme: "fonctions",
    term: "Fonction pure / effet de bord",
    definition:
      "Une fonction pure renvoie toujours le même résultat pour les mêmes arguments et ne modifie rien à l'extérieur. Un effet de bord est toute modification extérieure : variable globale, affichage, requête réseau…",
    example: "const pure = (a: number, b: number) => a + b;\nlet total = 0;\nfunction impure(n: number) {\n  total += n; // effet de bord\n}",
    pitfall: "Modifier un tableau reçu en paramètre (`push`, `sort`) est un effet de bord, même si la fonction ne touche aucune variable globale.",
    related: ["mutabilite"],
  },
  {
    id: "surcharge",
    theme: "fonctions",
    term: "Surcharge (overload)",
    definition:
      "Plusieurs signatures pour une même fonction, suivies d'une seule implémentation compatible avec toutes. L'appelant ne voit que les signatures de surcharge.",
    example:
      "function formater(x: string): string;\nfunction formater(x: number): string;\nfunction formater(x: string | number): string {\n  return String(x);\n}",
    pitfall: "La signature d'implémentation n'est pas appelable directement : seules les surcharges le sont.",
    related: ["signature", "union"],
  },
  {
    id: "recursivite",
    theme: "fonctions",
    term: "Récursivité",
    definition:
      "Une fonction récursive s'appelle elle-même. Elle a besoin d'un cas de base qui arrête les appels.",
    example: "function factorielle(n: number): number {\n  if (n <= 1) return 1; // cas de base\n  return n * factorielle(n - 1);\n}",
    pitfall: "Sans cas de base (ou s'il n'est jamais atteint), on obtient une erreur « Maximum call stack size exceeded ».",
    related: ["type-de-retour"],
  },
  {
    id: "this",
    theme: "fonctions",
    term: "this (fonction classique vs fléchée)",
    definition:
      "Dans une fonction classique, `this` dépend de la façon dont la fonction est appelée (`objet.methode()` → `objet`). Une fonction fléchée n'a pas son propre `this` : elle reprend celui du contexte où elle est écrite.",
    example:
      "const compteur = {\n  valeur: 0,\n  demarrer() {\n    setInterval(() => {\n      this.valeur++; // this = compteur grâce à la fléchée\n    }, 1000);\n  },\n};",
    pitfall: "Passer une méthode comme callback (`setTimeout(obj.methode)`) perd son `this`.",
    related: ["fonction-flechee", "classe"],
  },
];
