import { describe, expect, it } from "vitest";
import type { Question, QuestionProgress } from "../types";
import { BOX_DELAYS, countDue, DAY, pickRevision, review } from "./srs";

const NOW = Date.UTC(2026, 0, 1);

function q(id: string): Question {
  return {
    id, theme: "bases", format: "notion", type: "truefalse", prompt: "?",
    statement: "?", answer: true, explanation: "", glossary: [],
  };
}

/** Générateur pseudo-aléatoire déterministe pour les tests. */
function seeded(seed = 1): () => number {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

describe("review", () => {
  it("une première bonne réponse passe en boîte 2", () => {
    const p = review(undefined, true, NOW);
    expect(p).toEqual({ box: 2, due: NOW + BOX_DELAYS[2], seen: 1, correct: 1 });
  });

  it("une première erreur reste en boîte 1, à revoir tout de suite", () => {
    const p = review(undefined, false, NOW);
    expect(p).toEqual({ box: 1, due: NOW, seen: 1, correct: 0, lastWrong: NOW });
  });

  it("une bonne réponse fait monter d'une boîte, plafonnée à 5", () => {
    let p = review(undefined, true, NOW);
    for (let i = 0; i < 10; i++) p = review(p, true, NOW);
    expect(p.box).toBe(5);
    expect(p.due).toBe(NOW + 16 * DAY);
    expect(p.seen).toBe(11);
  });

  it("une erreur renvoie en boîte 1 et garde la date de l'erreur", () => {
    const before: QuestionProgress = { box: 4, due: NOW, seen: 5, correct: 5 };
    const after = review(before, false, NOW);
    expect(after.box).toBe(1);
    expect(after.due).toBe(NOW);
    expect(after.lastWrong).toBe(NOW);
    expect(review(after, true, NOW + DAY).lastWrong).toBe(NOW);
  });
});

describe("pickRevision", () => {
  const questions = ["a", "b", "c", "d", "e"].map(q);

  it("ignore les questions jamais vues", () => {
    expect(pickRevision(questions, {}, 10, NOW)).toEqual([]);
  });

  it("prend d'abord les questions échues, boîtes basses en premier", () => {
    const progress: Record<string, QuestionProgress> = {
      a: { box: 3, due: NOW - DAY, seen: 3, correct: 3 },
      b: { box: 1, due: NOW, seen: 2, correct: 0 },
      c: { box: 5, due: NOW + 10 * DAY, seen: 6, correct: 6 },
    };
    const picked = pickRevision(questions, progress, 2, NOW, seeded());
    expect(picked.map((x) => x.id)).toEqual(["b", "a"]);
  });

  it("complète avec les questions non échues", () => {
    const progress: Record<string, QuestionProgress> = {
      a: { box: 1, due: NOW, seen: 1, correct: 0 },
      b: { box: 4, due: NOW + DAY, seen: 4, correct: 4 },
    };
    const picked = pickRevision(questions, progress, 10, NOW, seeded());
    expect(picked.map((x) => x.id)).toEqual(["a", "b"]);
  });

  it("les questions ratées sortent plus souvent dans le tirage pondéré", () => {
    const progress: Record<string, QuestionProgress> = {
      a: { box: 2, due: NOW + DAY, seen: 2, correct: 1 },
      b: { box: 5, due: NOW + DAY, seen: 6, correct: 6 },
    };
    const random = seeded(42);
    let aFirst = 0;
    for (let i = 0; i < 1000; i++) {
      if (pickRevision(questions, progress, 1, NOW, random)[0]?.id === "a") aFirst++;
    }
    // poids 4 contre 1 → environ 80 %
    expect(aFirst).toBeGreaterThan(700);
    expect(aFirst).toBeLessThan(900);
  });
});

describe("countDue", () => {
  it("compte les questions échues", () => {
    expect(
      countDue(
        {
          a: { box: 1, due: NOW, seen: 1, correct: 0 },
          b: { box: 2, due: NOW + DAY, seen: 1, correct: 1 },
        },
        NOW,
      ),
    ).toBe(1);
  });
});
