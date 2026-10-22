import type { Level, Progress, Question, Theme, ThemeId } from "../types";
import { pickRevision, type Random } from "./srs";

export const SESSION_SIZE = 10;

export function shuffle<T>(items: readonly T[], random: Random = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j] as T, copy[i] as T];
  }
  return copy;
}

export type SessionRequest =
  | { mode: "theme"; theme: ThemeId }
  | { mode: "mixte"; level?: Level }
  | { mode: "revision" };

export function buildSession(
  request: SessionRequest,
  themes: readonly Theme[],
  progress: Progress,
  now: number,
  random: Random = Math.random,
  size: number = SESSION_SIZE,
): Question[] {
  switch (request.mode) {
    case "theme": {
      const theme = themes.find((t) => t.id === request.theme);
      return shuffle(theme?.questions ?? [], random).slice(0, size);
    }
    case "mixte": {
      const pool = themes
        .filter((t) => request.level === undefined || t.level === request.level)
        .flatMap((t) => t.questions);
      return shuffle(pool, random).slice(0, size);
    }
    case "revision": {
      const all = themes.flatMap((t) => t.questions);
      return shuffle(pickRevision(all, progress.questions, size, now, random), random);
    }
  }
}
