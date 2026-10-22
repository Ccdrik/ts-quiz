export type Level = "debutant" | "intermediaire" | "avance";

export type ThemeId =
  | "bases"
  | "fonctions"
  | "donnees"
  | "types"
  | "generiques"
  | "poo"
  | "async"
  | "modules";

/** Format pédagogique, indépendant du mode de réponse. */
export type QuestionFormat = "nommer" | "erreur" | "inference" | "notion";

export type CodeLang = "ts" | "json" | "sh";

/**
 * Extrait de code affiché avec la question.
 * Dans `source`, [[…]] marque l'élément surligné (format « nommer »).
 */
export interface CodeSnippet {
  source: string;
  lang?: CodeLang;
  /** false : ne pas vérifier la compilation (extrait volontairement partiel). */
  check?: false;
}

interface BaseQuestion {
  /** Identifiant stable, clé de la progression : "fonctions-07". */
  id: string;
  theme: ThemeId;
  format: QuestionFormat;
  /** Énoncé. Le texte entre `backticks` est affiché comme du code. */
  prompt: string;
  code?: CodeSnippet;
  /** Explication courte (1 à 3 phrases). */
  explanation: string;
  /** Mini-exemple affiché sous l'explication (doit compiler). */
  example?: string;
  /** Identifiants des termes du glossaire liés. */
  glossary: string[];
  /** Comparer en respectant la casse (ex. `String` ≠ `string`). */
  caseSensitive?: true;
}

export interface BlankQuestion extends BaseQuestion {
  type: "blank";
  /** Code avec des trous {{0}}, {{1}}… remplacés par des champs inline. */
  template: string;
  /** Pour chaque trou, la liste des réponses acceptées. */
  blanks: string[][];
  lang?: CodeLang;
  /** false : ne pas vérifier la compilation du code complété. */
  check?: false;
}

export interface FreeQuestion extends BaseQuestion {
  type: "free";
  answers: [string, ...string[]];
}

export interface McqQuestion extends BaseQuestion {
  type: "mcq";
  choices:
    | [string, string]
    | [string, string, string]
    | [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "truefalse";
  statement: string;
  answer: boolean;
}

export type Question =
  | BlankQuestion
  | FreeQuestion
  | McqQuestion
  | TrueFalseQuestion;

export type QuestionType = Question["type"];

/** Réponse donnée par l'utilisateur, typée selon la question. */
export type UserAnswer =
  | { type: "blank"; values: string[] }
  | { type: "free"; value: string }
  | { type: "mcq"; choice: number }
  | { type: "truefalse"; value: boolean };

export interface GradeResult {
  correct: boolean;
  /** Pour les textes à trous : résultat de chaque trou. */
  blanks?: boolean[];
}

export interface GlossaryTerm {
  id: string;
  theme: ThemeId;
  term: string;
  definition: string;
  /** Exemple TypeScript (doit compiler ; erreurs signalées par @ts-expect-error). */
  example: string;
  pitfall: string;
  related: string[];
}

export interface Theme {
  id: ThemeId;
  title: string;
  level: Level;
  icon: string;
  description: string;
  questions: Question[];
  glossary: GlossaryTerm[];
}

export type Box = 1 | 2 | 3 | 4 | 5;

export interface QuestionProgress {
  box: Box;
  /** Date (ms) à partir de laquelle la question est à revoir. */
  due: number;
  seen: number;
  correct: number;
  lastWrong?: number;
}

export type TermStatus = "maitrise" | "a-revoir";
export type ColorScheme = "system" | "light" | "dark";

export interface Progress {
  version: 1;
  questions: Record<string, QuestionProgress>;
  terms: Record<string, TermStatus>;
  scheme: ColorScheme;
}
