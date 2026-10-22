import { splitInlineCode } from "../lib/snippet";

/** Texte où les passages entre `backticks` sont affichés comme du code. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {splitInlineCode(text).map((part, i) =>
        part.code ? <code key={i} className="inline-code">{part.text}</code> : part.text,
      )}
    </>
  );
}
