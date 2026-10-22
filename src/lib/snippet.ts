/** Découpage d'un extrait de code en morceaux : texte, élément surligné [[…]] ou trou {{n}}. */
export type SnippetPart =
  | { kind: "text"; text: string }
  | { kind: "mark"; text: string }
  | { kind: "slot"; index: number };

const PART_RE = /\[\[([\s\S]*?)\]\]|\{\{(\d+)\}\}/g;

export function parseSnippet(source: string): SnippetPart[] {
  const parts: SnippetPart[] = [];
  let last = 0;
  for (const m of source.matchAll(PART_RE)) {
    const start = m.index;
    if (start > last) parts.push({ kind: "text", text: source.slice(last, start) });
    if (m[1] !== undefined) parts.push({ kind: "mark", text: m[1] });
    else parts.push({ kind: "slot", index: Number(m[2]) });
    last = start + m[0].length;
  }
  if (last < source.length) parts.push({ kind: "text", text: source.slice(last) });
  return parts;
}

/** Code sans marqueurs, trous remplis avec les valeurs données. */
export function fillSnippet(source: string, values: readonly string[] = []): string {
  return parseSnippet(source)
    .map((p) => (p.kind === "slot" ? (values[p.index] ?? "") : p.text))
    .join("");
}

/** Indices des trous présents dans un modèle. */
export function slotIndices(source: string): number[] {
  return parseSnippet(source).flatMap((p) => (p.kind === "slot" ? [p.index] : []));
}

/** Découpe un texte en alternant prose et `code` inline. */
export function splitInlineCode(text: string): { code: boolean; text: string }[] {
  return text
    .split(/(`[^`]+`)/g)
    .filter((s) => s !== "")
    .map((s) =>
      s.startsWith("`") && s.endsWith("`") && s.length > 1
        ? { code: true, text: s.slice(1, -1) }
        : { code: false, text: s },
    );
}
