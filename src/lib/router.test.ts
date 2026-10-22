import { describe, expect, it } from "vitest";
import { href, parseHash } from "./router";

describe("parseHash", () => {
  it("reconnaît chaque écran", () => {
    expect(parseHash("")).toEqual({ name: "home" });
    expect(parseHash(href.theme("poo"))).toEqual({ name: "quiz", request: { mode: "theme", theme: "poo" } });
    expect(parseHash(href.mixte())).toEqual({ name: "quiz", request: { mode: "mixte" } });
    expect(parseHash(href.mixte("avance"))).toEqual({ name: "quiz", request: { mode: "mixte", level: "avance" } });
    expect(parseHash(href.revision())).toEqual({ name: "quiz", request: { mode: "revision" } });
    expect(parseHash(href.glossary())).toEqual({ name: "glossary" });
    expect(parseHash(href.glossary("any"))).toEqual({ name: "glossary", termId: "any" });
    expect(parseHash(href.stats())).toEqual({ name: "stats" });
  });

  it("revient à l'accueil pour une adresse inconnue", () => {
    expect(parseHash("#/quiz/theme/inconnu")).toEqual({ name: "home" });
    expect(parseHash("#/nimporte")).toEqual({ name: "home" });
  });
});
