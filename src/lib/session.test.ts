import { describe, expect, it } from "vitest";
import { THEMES } from "../data";
import { buildSession, shuffle } from "./session";
import { emptyProgress, parseProgress } from "./storage";

const NOW = Date.UTC(2026, 0, 1);

describe("shuffle", () => {
  it("garde les mêmes éléments sans modifier l'original", () => {
    const items = [1, 2, 3, 4, 5];
    const result = shuffle(items);
    expect([...result].sort()).toEqual(items);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("buildSession", () => {
  it("session par thème : uniquement les questions du thème, 10 max, sans doublon", () => {
    const qs = buildSession({ mode: "theme", theme: "bases" }, THEMES, emptyProgress(), NOW);
    expect(qs.length).toBeLessThanOrEqual(10);
    expect(qs.length).toBeGreaterThan(0);
    expect(qs.every((q) => q.theme === "bases")).toBe(true);
    expect(new Set(qs.map((q) => q.id)).size).toBe(qs.length);
  });

  it("session mixte filtrée par niveau", () => {
    const qs = buildSession({ mode: "mixte", level: "avance" }, THEMES, emptyProgress(), NOW);
    const avances = new Set(THEMES.filter((t) => t.level === "avance").map((t) => t.id));
    expect(qs.every((q) => avances.has(q.theme))).toBe(true);
  });

  it("révisions : uniquement des questions déjà vues", () => {
    const progress = emptyProgress();
    progress.questions["bases-01"] = { box: 1, due: NOW, seen: 1, correct: 0 };
    const qs = buildSession({ mode: "revision" }, THEMES, progress, NOW);
    expect(qs.map((q) => q.id)).toEqual(["bases-01"]);
  });
});

describe("parseProgress", () => {
  it("résiste aux données invalides", () => {
    expect(parseProgress(null)).toEqual(emptyProgress());
    expect(parseProgress("pas du json")).toEqual(emptyProgress());
    expect(parseProgress('{"version":2}')).toEqual(emptyProgress());
  });

  it("relit une progression valide", () => {
    const p = { ...emptyProgress(), terms: { any: "a-revoir" as const } };
    expect(parseProgress(JSON.stringify(p))).toEqual(p);
  });
});
