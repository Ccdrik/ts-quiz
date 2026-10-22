import type { Box, Progress, Question, QuestionProgress } from "../types";

export const DAY = 24 * 60 * 60 * 1000;

/** Délai avant le prochain rappel selon la boîte (Leitner). Boîte 1 = à revoir tout de suite. */
export const BOX_DELAYS: Record<Box, number> = {
  1: 0,
  2: 1 * DAY,
  3: 3 * DAY,
  4: 7 * DAY,
  5: 16 * DAY,
};

/** Met à jour la progression d'une question après une réponse. */
export function review(
  previous: QuestionProgress | undefined,
  correct: boolean,
  now: number,
): QuestionProgress {
  const box: Box = correct ? nextBox(previous?.box ?? 1) : 1;
  const updated: QuestionProgress = {
    box,
    due: now + BOX_DELAYS[box],
    seen: (previous?.seen ?? 0) + 1,
    correct: (previous?.correct ?? 0) + (correct ? 1 : 0),
  };
  const lastWrong = correct ? previous?.lastWrong : now;
  if (lastWrong !== undefined) updated.lastWrong = lastWrong;
  return updated;
}

function nextBox(box: Box): Box {
  return box >= 5 ? 5 : ((box + 1) as Box);
}

export function isDue(progress: QuestionProgress, now: number): boolean {
  return progress.due <= now;
}

/** Poids de tirage : plus la boîte est basse (question souvent ratée), plus elle revient. */
export function weight(progress: QuestionProgress): number {
  return 6 - progress.box;
}

export type Random = () => number;

/**
 * Sélection du mode Révisions, parmi les questions déjà vues :
 * 1. d'abord celles dont le rappel est échu, boîtes basses en premier ;
 * 2. puis tirage pondéré (poids = 6 − boîte) parmi les autres.
 */
export function pickRevision(
  questions: readonly Question[],
  progress: Progress["questions"],
  count: number,
  now: number,
  random: Random = Math.random,
): Question[] {
  const seen = questions.flatMap((q) => {
    const p = progress[q.id];
    return p ? [{ q, p }] : [];
  });

  const due = seen
    .filter(({ p }) => isDue(p, now))
    .map((entry) => ({ ...entry, tie: random() }))
    .sort((a, b) => a.p.box - b.p.box || a.p.due - b.p.due || a.tie - b.tie);

  const picked = due.slice(0, count).map(({ q }) => q);
  let pool = seen.filter(({ p }) => !isDue(p, now));

  while (picked.length < count && pool.length > 0) {
    const total = pool.reduce((sum, { p }) => sum + weight(p), 0);
    let r = random() * total;
    let index = pool.findIndex(({ p }) => (r -= weight(p)) < 0);
    if (index === -1) index = pool.length - 1;
    const entry = pool[index];
    if (!entry) break;
    picked.push(entry.q);
    pool = pool.filter((_, i) => i !== index);
  }
  return picked;
}

/** Nombre de questions dont le rappel est échu. */
export function countDue(progress: Progress["questions"], now: number): number {
  return Object.values(progress).filter((p) => isDue(p, now)).length;
}
