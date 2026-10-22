import type { GlossaryTerm, Level, Question, Theme, ThemeId } from "../types";
import { questions as bases } from "./bases";
import { questions as fonctions } from "./fonctions";
import { questions as donnees } from "./donnees";
import { questions as types } from "./types";
import { questions as generiques } from "./generiques";
import { questions as poo } from "./poo";
import { questions as asyncQuestions } from "./async";
import { questions as modules } from "./modules";
import { glossary as gBases } from "./glossary/bases";
import { glossary as gFonctions } from "./glossary/fonctions";
import { glossary as gDonnees } from "./glossary/donnees";
import { glossary as gTypes } from "./glossary/types";
import { glossary as gGeneriques } from "./glossary/generiques";
import { glossary as gPoo } from "./glossary/poo";
import { glossary as gAsync } from "./glossary/async";
import { glossary as gModules } from "./glossary/modules";

/** Thèmes dans l'ordre du parcours, du plus simple au plus avancé. */
export const THEMES: Theme[] = [
  {
    id: "bases",
    title: "Bases de la programmation",
    level: "debutant",
    icon: "🧱",
    description: "Variables, opérateurs, conditions, boucles, portée",
    questions: bases,
    glossary: gBases,
  },
  {
    id: "fonctions",
    title: "Fonctions",
    level: "debutant",
    icon: "🔧",
    description: "Paramètres, retour, fléchées, closures, this",
    questions: fonctions,
    glossary: gFonctions,
  },
  {
    id: "donnees",
    title: "Données & structures",
    level: "debutant",
    icon: "📦",
    description: "Primitifs, objets, tableaux, tuples, JSON",
    questions: donnees,
    glossary: gDonnees,
  },
  {
    id: "types",
    title: "Système de types",
    level: "intermediaire",
    icon: "🧩",
    description: "Inférence, unions, narrowing, any / unknown",
    questions: types,
    glossary: gTypes,
  },
  {
    id: "poo",
    title: "Programmation orientée objet",
    level: "intermediaire",
    icon: "🏛️",
    description: "Classes, héritage, visibilité, abstraction",
    questions: poo,
    glossary: gPoo,
  },
  {
    id: "async",
    title: "Asynchrone",
    level: "intermediaire",
    icon: "⏳",
    description: "Promise, async / await, gestion d'erreurs",
    questions: asyncQuestions,
    glossary: gAsync,
  },
  {
    id: "modules",
    title: "Modules & outillage",
    level: "intermediaire",
    icon: "🛠️",
    description: "import / export, tsc, tsconfig, npm",
    questions: modules,
    glossary: gModules,
  },
  {
    id: "generiques",
    title: "Génériques & types avancés",
    level: "avance",
    icon: "🧬",
    description: "<T>, keyof, mapped & conditional types, utility types",
    questions: generiques,
    glossary: gGeneriques,
  },
];

export const LEVELS: { id: Level; label: string }[] = [
  { id: "debutant", label: "Débutant" },
  { id: "intermediaire", label: "Intermédiaire" },
  { id: "avance", label: "Avancé" },
];

export const LEVEL_LABELS: Record<Level, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

export const ALL_QUESTIONS: Question[] = THEMES.flatMap((t) => t.questions);
export const ALL_TERMS: GlossaryTerm[] = THEMES.flatMap((t) => t.glossary);

export const THEME_BY_ID = new Map<ThemeId, Theme>(THEMES.map((t) => [t.id, t]));
export const TERM_BY_ID = new Map<string, GlossaryTerm>(ALL_TERMS.map((t) => [t.id, t]));
export const QUESTION_BY_ID = new Map<string, Question>(ALL_QUESTIONS.map((q) => [q.id, q]));
