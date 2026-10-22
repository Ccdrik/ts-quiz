import { useSyncExternalStore } from "react";
import type { Level, ThemeId } from "../types";
import type { SessionRequest } from "./session";

/** Routage par hash : fonctionne hors ligne et dans n'importe quel sous-dossier. */
export type Route =
  | { name: "home" }
  | { name: "quiz"; request: SessionRequest }
  | { name: "glossary"; termId?: string }
  | { name: "stats" };

const THEME_IDS: readonly ThemeId[] = [
  "bases", "fonctions", "donnees", "types", "generiques", "poo", "async", "modules",
];
const LEVEL_IDS: readonly Level[] = ["debutant", "intermediaire", "avance"];

function isThemeId(value: string | undefined): value is ThemeId {
  return THEME_IDS.some((id) => id === value);
}

function isLevel(value: string | undefined): value is Level {
  return LEVEL_IDS.some((id) => id === value);
}

export function parseHash(hash: string): Route {
  const [section, a, b] = hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  switch (section) {
    case "quiz":
      if (a === "theme" && isThemeId(b)) return { name: "quiz", request: { mode: "theme", theme: b } };
      if (a === "mixte") {
        return { name: "quiz", request: isLevel(b) ? { mode: "mixte", level: b } : { mode: "mixte" } };
      }
      if (a === "revision") return { name: "quiz", request: { mode: "revision" } };
      return { name: "home" };
    case "glossaire":
      return a ? { name: "glossary", termId: a } : { name: "glossary" };
    case "stats":
      return { name: "stats" };
    default:
      return { name: "home" };
  }
}

export const href = {
  home: () => "#/",
  theme: (id: ThemeId) => `#/quiz/theme/${id}`,
  mixte: (level?: Level) => (level ? `#/quiz/mixte/${level}` : "#/quiz/mixte"),
  revision: () => "#/quiz/revision",
  glossary: (termId?: string) => (termId ? `#/glossaire/${encodeURIComponent(termId)}` : "#/glossaire"),
  stats: () => "#/stats",
};

function subscribe(callback: () => void): () => void {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

export function useHash(): string {
  return useSyncExternalStore(subscribe, () => window.location.hash);
}

export function navigate(to: string): void {
  window.location.hash = to;
}
