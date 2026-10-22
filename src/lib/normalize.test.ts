import { describe, expect, it } from "vitest";
import { matches, normalize } from "./normalize";

describe("normalize", () => {
  it("ignore la casse", () => {
    expect(normalize("Readonly")).toBe("readonly");
  });

  it("respecte la casse si demandé", () => {
    expect(normalize("String", { caseSensitive: true })).toBe("String");
  });

  it("supprime les espaces superflus", () => {
    expect(normalize("  type   guard ")).toBe("type guard");
  });

  it("ignore les espaces autour des symboles", () => {
    expect(normalize("Array< string >")).toBe(normalize("Array<string>"));
    expect(normalize("( n : number ) => number")).toBe(normalize("(n: number) => number"));
    expect(normalize("string | number")).toBe(normalize("string|number"));
  });

  it("ignore le point-virgule final", () => {
    expect(normalize("const x = 1;")).toBe(normalize("const x = 1"));
    expect(normalize("readonly ;;")).toBe("readonly");
  });

  it("ignore les accents", () => {
    expect(normalize("paramètre")).toBe(normalize("parametre"));
  });

  it("traite apostrophes et guillemets de la même façon", () => {
    expect(normalize("'Bonjour'")).toBe(normalize('"Bonjour"'));
    expect(normalize("l’argument")).toBe(normalize("l'argument"));
  });
});

describe("matches", () => {
  it("accepte l'une des réponses valides", () => {
    expect(matches("array<number>", ["number[]", "Array<number>"])).toBe(true);
    expect(matches("NUMBER[]", ["number[]", "Array<number>"])).toBe(true);
  });

  it("refuse une réponse vide", () => {
    expect(matches("   ", [""])).toBe(false);
  });

  it("refuse une mauvaise réponse", () => {
    expect(matches("string", ["number"])).toBe(false);
  });

  it("distingue String et string en mode sensible à la casse", () => {
    expect(matches("String", ["string"], { caseSensitive: true })).toBe(false);
    expect(matches("string", ["string"], { caseSensitive: true })).toBe(true);
  });
});
