import type { Progress, Theme } from "../types";

export interface ThemeStats {
  answered: number;
  correct: number;
  /** Questions distinctes déjà vues. */
  seen: number;
  total: number;
  /** Pourcentage de réussite, null si aucune réponse. */
  rate: number | null;
}

export function themeStats(theme: Theme, progress: Progress): ThemeStats {
  let answered = 0;
  let correct = 0;
  let seen = 0;
  for (const q of theme.questions) {
    const p = progress.questions[q.id];
    if (!p) continue;
    seen++;
    answered += p.seen;
    correct += p.correct;
  }
  return {
    answered,
    correct,
    seen,
    total: theme.questions.length,
    rate: answered === 0 ? null : Math.round((correct / answered) * 100),
  };
}
