import type { GlossaryTerm } from "../../types";

export const glossary: GlossaryTerm[] = [
  {
    id: "module",
    theme: "modules",
    term: "Module",
    definition:
      "Fichier qui contient au moins un `import` ou un `export` ; ses variables ont une portée locale au fichier.",
    example: "export const TVA = 0.2;\nexport function ttc(ht: number) {\n  return ht * (1 + TVA);\n}",
    pitfall: "Un fichier sans `import` ni `export` est un script : ses déclarations sont globales.",
    related: ["export-default", "import-type"],
  },
  {
    id: "export-default",
    theme: "modules",
    term: "export default / export nommé",
    definition:
      "Un module a au plus un export par défaut (importé sans accolades, nom libre) et autant d'exports nommés que voulu (importés entre accolades, même nom).",
    example: "export default function principal() {}\nexport const version = \"1.0\";",
    pitfall: "Beaucoup d'équipes préfèrent les exports nommés : renommer un export par défaut à l'import est source d'incohérences.",
    related: ["module"],
  },
  {
    id: "import-type",
    theme: "modules",
    term: "import type",
    definition:
      "Import qui ne concerne que des types ; il est entièrement supprimé du JavaScript compilé.",
    example: "// import type { User } from \"./user\";\nexport type Id = number;",
    pitfall: "On ne peut pas utiliser une valeur importée via `import type` à l'exécution (ex. `new User()`).",
    related: ["module"],
  },
  {
    id: "tsconfig",
    theme: "modules",
    term: "tsconfig.json",
    definition:
      "Fichier de configuration du compilateur TypeScript : fichiers à inclure, version de JavaScript cible, niveau de vérification…",
    example: "// tsconfig.json\n// { \"compilerOptions\": { \"strict\": true, \"target\": \"ES2022\" } }\nexport {};",
    pitfall: "Les options de `tsconfig.json` ne s'appliquent pas si on passe des fichiers en argument à `tsc` en ligne de commande.",
    related: ["strict"],
  },
  {
    id: "strict",
    theme: "modules",
    term: "strict",
    definition:
      "Option de `tsconfig.json` qui active l'ensemble des vérifications strictes : `noImplicitAny`, `strictNullChecks`, etc.",
    example: "function f(s: string | null) {\n  // @ts-expect-error s peut être null avec strictNullChecks\n  return s.length;\n}",
    pitfall: "Activer `strict` tardivement sur un gros projet fait apparaître beaucoup d'erreurs d'un coup : active-le dès le début.",
    related: ["tsconfig"],
  },
];
