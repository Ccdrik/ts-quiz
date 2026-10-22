import type { CodeLang } from "../types";

export type TokenKind = "keyword" | "type" | "string" | "number" | "comment" | "plain";

export interface Token {
  kind: TokenKind;
  text: string;
}

const KEYWORDS = new Set([
  "abstract", "as", "async", "await", "break", "case", "catch", "class", "const",
  "constructor", "continue", "declare", "default", "delete", "do", "else", "enum",
  "export", "extends", "false", "finally", "for", "from", "function", "get", "if",
  "implements", "import", "in", "infer", "instanceof", "interface", "is", "keyof",
  "let", "namespace", "new", "null", "of", "override", "private", "protected",
  "public", "readonly", "return", "satisfies", "set", "static", "super", "switch",
  "this", "throw", "true", "try", "type", "typeof", "undefined", "var", "while",
  "yield",
]);

const BUILTIN_TYPES = new Set([
  "string", "number", "boolean", "bigint", "symbol", "object", "any", "unknown",
  "never", "void",
]);

const TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(\b\d[\d_]*(?:\.\d+)?n?\b)|([A-Za-z_$][\w$]*)/g;

const SH_COMMENT_RE = /(#[^\n]*)/g;

/** Coloration syntaxique légère : suffisante pour des extraits courts. */
export function tokenize(code: string, lang: CodeLang = "ts"): Token[] {
  if (lang === "sh") return splitBy(code, SH_COMMENT_RE, () => "comment");

  const tokens: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN_RE)) {
    if (m.index > last) tokens.push({ kind: "plain", text: code.slice(last, m.index) });
    tokens.push({ kind: kindOf(m, lang), text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < code.length) tokens.push({ kind: "plain", text: code.slice(last) });
  return tokens;
}

function kindOf(m: RegExpMatchArray, lang: CodeLang): TokenKind {
  if (m[1] !== undefined) return "comment";
  if (m[2] !== undefined) return "string";
  if (m[3] !== undefined) return "number";
  const word = m[4] ?? "";
  if (lang === "json") return word === "true" || word === "false" || word === "null" ? "keyword" : "plain";
  if (KEYWORDS.has(word)) return "keyword";
  if (BUILTIN_TYPES.has(word) || /^[A-Z]/.test(word)) return "type";
  return "plain";
}

function splitBy(code: string, re: RegExp, kind: () => TokenKind): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(re)) {
    if (m.index > last) tokens.push({ kind: "plain", text: code.slice(last, m.index) });
    tokens.push({ kind: kind(), text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < code.length) tokens.push({ kind: "plain", text: code.slice(last) });
  return tokens;
}
