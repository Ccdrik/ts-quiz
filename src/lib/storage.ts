import type { Progress } from "../types";

export const STORAGE_KEY = "ts-quiz:progress:v1";

export function emptyProgress(): Progress {
  return { version: 1, questions: {}, terms: {}, scheme: "system" };
}

/** Vérifie la forme des données lues : le localStorage peut contenir n'importe quoi. */
export function parseProgress(raw: string | null): Progress {
  if (raw === null) return emptyProgress();
  try {
    const data: unknown = JSON.parse(raw);
    if (
      typeof data === "object" &&
      data !== null &&
      "version" in data &&
      data.version === 1 &&
      "questions" in data &&
      typeof data.questions === "object" &&
      data.questions !== null
    ) {
      return { ...emptyProgress(), ...(data as Progress) };
    }
  } catch {
    // JSON invalide : on repart de zéro
  }
  return emptyProgress();
}

export function loadProgress(): Progress {
  try {
    return parseProgress(localStorage.getItem(STORAGE_KEY));
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // stockage indisponible (navigation privée, quota) : la session continue en mémoire
  }
}
