import type { ReactNode } from "react";
import { tokenize } from "../lib/highlight";
import { parseSnippet } from "../lib/snippet";
import type { CodeLang } from "../types";

interface CodeBlockProps {
  source: string;
  lang?: CodeLang | undefined;
  /** Rendu des trous {{n}} (champs de saisie des textes à trous). */
  renderSlot?: (index: number) => ReactNode;
  compact?: boolean;
}

export function CodeBlock({ source, lang = "ts", renderSlot, compact = false }: CodeBlockProps) {
  return (
    <pre className={compact ? "code code-compact" : "code"} tabIndex={0}>
      <code>
        {parseSnippet(source).map((part, i) => {
          switch (part.kind) {
            case "text":
              return <Highlighted key={i} text={part.text} lang={lang} />;
            case "mark":
              return (
                <mark key={i} className="code-mark">
                  <Highlighted text={part.text} lang={lang} />
                </mark>
              );
            case "slot":
              return <span key={i}>{renderSlot ? renderSlot(part.index) : "___"}</span>;
          }
        })}
      </code>
    </pre>
  );
}

function Highlighted({ text, lang }: { text: string; lang: CodeLang }) {
  return (
    <>
      {tokenize(text, lang).map((token, i) =>
        token.kind === "plain" ? token.text : (
          <span key={i} className={`tok-${token.kind}`}>
            {token.text}
          </span>
        ),
      )}
    </>
  );
}
