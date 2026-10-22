import ts from "typescript";
import { describe, expect, it } from "vitest";
import { fillSnippet, parseSnippet, slotIndices } from "../lib/snippet";
import { ALL_QUESTIONS, ALL_TERMS, TERM_BY_ID, THEMES } from "./index";

/** Minimum de questions par thème (relevé à 10 avec le contenu complet). */
const MIN_QUESTIONS_PER_THEME = 3;

describe("intégrité du contenu", () => {
  it("identifiants de questions uniques et préfixés par le thème", () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const theme of THEMES) {
      for (const q of theme.questions) {
        expect(q.theme, q.id).toBe(theme.id);
        expect(q.id.startsWith(`${theme.id}-`), q.id).toBe(true);
      }
    }
  });

  it("identifiants de termes uniques et rangés dans le bon thème", () => {
    const ids = ALL_TERMS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const theme of THEMES) {
      for (const term of theme.glossary) expect(term.theme, term.id).toBe(theme.id);
    }
  });

  it.each(THEMES.map((t) => [t.id, t] as const))("thème %s : assez de questions", (_, theme) => {
    expect(theme.questions.length).toBeGreaterThanOrEqual(MIN_QUESTIONS_PER_THEME);
  });

  it("les liens vers le glossaire existent", () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.glossary.length, q.id).toBeGreaterThan(0);
      for (const id of q.glossary) expect(TERM_BY_ID.has(id), `${q.id} → ${id}`).toBe(true);
    }
    for (const t of ALL_TERMS) {
      for (const id of t.related) {
        expect(id, t.id).not.toBe(t.id);
        expect(TERM_BY_ID.has(id), `${t.id} → ${id}`).toBe(true);
      }
    }
  });

  it("chaque question est cohérente avec son type", () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.explanation.trim(), q.id).not.toBe("");
      switch (q.type) {
        case "blank": {
          const slots = slotIndices(q.template).sort((a, b) => a - b);
          expect(slots, q.id).toEqual(q.blanks.map((_, i) => i));
          for (const accepted of q.blanks) expect(accepted.length, q.id).toBeGreaterThan(0);
          break;
        }
        case "free":
          for (const a of q.answers) expect(a.trim(), q.id).not.toBe("");
          break;
        case "mcq":
          expect(q.correct, q.id).toBeLessThan(q.choices.length);
          expect(new Set(q.choices).size, q.id).toBe(q.choices.length);
          break;
        case "truefalse":
          expect(q.statement.trim(), q.id).not.toBe("");
          break;
      }
    }
  });

  it("les questions « nommer l'élément » surlignent un élément", () => {
    for (const q of ALL_QUESTIONS.filter((x) => x.format === "nommer")) {
      const marks = parseSnippet(q.code?.source ?? "").filter((p) => p.kind === "mark");
      expect(marks.length, q.id).toBe(1);
    }
  });

  it("les questions « trouver l'erreur » montrent du code", () => {
    for (const q of ALL_QUESTIONS.filter((x) => x.format === "erreur")) {
      expect(q.code, q.id).toBeDefined();
    }
  });
});

// ---------------------------------------------------------------------------
// Compilation de tous les extraits de code avec le vrai compilateur TypeScript
// ---------------------------------------------------------------------------

interface Snippet {
  name: string;
  code: string;
  /** true pour « trouver l'erreur » : le code doit échouer. */
  expectError: boolean;
}

function collectSnippets(): Snippet[] {
  const snippets: Snippet[] = [];
  for (const q of ALL_QUESTIONS) {
    if (q.code && (q.code.lang ?? "ts") === "ts" && q.code.check !== false) {
      snippets.push({ name: `${q.id}.code`, code: fillSnippet(q.code.source), expectError: q.format === "erreur" });
    }
    if (q.type === "blank" && (q.lang ?? "ts") === "ts" && q.check !== false) {
      const filled = fillSnippet(q.template, q.blanks.map((b) => b[0] ?? ""));
      snippets.push({ name: `${q.id}.complete`, code: filled, expectError: false });
    }
    if (q.example) snippets.push({ name: `${q.id}.example`, code: q.example, expectError: false });
  }
  for (const t of ALL_TERMS) {
    snippets.push({ name: `glossaire.${t.id}`, code: t.example, expectError: false });
  }
  return snippets;
}

const COMPILER_OPTIONS: ts.CompilerOptions = {
  strict: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  lib: ["lib.es2023.d.ts", "lib.dom.d.ts"],
  types: [],
  noEmit: true,
  skipLibCheck: true,
};

function compileAll(snippets: Snippet[]): Map<string, string[]> {
  const files = new Map(
    // chaque extrait est un module isolé : pas de collision de noms entre eux
    snippets.map((s) => [`/snippets/${s.name}.ts`, `${s.code}\nexport {};\n`]),
  );
  const host = ts.createCompilerHost(COMPILER_OPTIONS);
  const { getSourceFile, fileExists, readFile } = host;
  host.getSourceFile = (fileName, languageVersion, ...rest) => {
    const text = files.get(fileName);
    return text !== undefined
      ? ts.createSourceFile(fileName, text, languageVersion, true)
      : getSourceFile.call(host, fileName, languageVersion, ...rest);
  };
  host.fileExists = (f) => files.has(f) || fileExists.call(host, f);
  host.readFile = (f) => files.get(f) ?? readFile.call(host, f);

  const program = ts.createProgram([...files.keys()], COMPILER_OPTIONS, host);
  const result = new Map<string, string[]>();
  for (const [fileName] of files) {
    const sf = program.getSourceFile(fileName);
    if (!sf) throw new Error(`Fichier introuvable : ${fileName}`);
    const diagnostics = [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)];
    result.set(
      fileName,
      diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")),
    );
  }
  return result;
}

describe("compilation des extraits de code", () => {
  const snippets = collectSnippets();
  const diagnostics = compileAll(snippets);

  it.each(snippets.map((s) => [s.name, s] as const))("%s", (_, snippet) => {
    const errors = diagnostics.get(`/snippets/${snippet.name}.ts`) ?? [];
    if (snippet.expectError) {
      expect(errors.length, `${snippet.name} devrait produire une erreur`).toBeGreaterThan(0);
    } else {
      expect(errors, `${snippet.name}\n${snippet.code}`).toEqual([]);
    }
  });
});
