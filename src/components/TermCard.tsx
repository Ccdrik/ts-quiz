import { TERM_BY_ID, THEME_BY_ID } from "../data";
import type { GlossaryTerm } from "../types";
import { CodeBlock } from "./CodeBlock";
import { useProgress } from "./ProgressContext";
import { RichText } from "./RichText";

interface TermCardProps {
  term: GlossaryTerm;
  onSelectTerm: (termId: string) => void;
}

/** Fiche complète d'un terme du glossaire. */
export function TermCard({ term, onSelectTerm }: TermCardProps) {
  const { progress, setTermStatus } = useProgress();
  const status = progress.terms[term.id];
  const theme = THEME_BY_ID.get(term.theme);

  return (
    <article className="term-card">
      <p className="muted small">
        {theme?.icon} {theme?.title}
      </p>
      <h2 className="term-title">{term.term}</h2>
      <p>
        <RichText text={term.definition} />
      </p>
      <h3 className="term-section">Exemple</h3>
      <CodeBlock source={term.example} />
      <div className="pitfall">
        <strong>⚠️ Piège courant</strong>
        <p>
          <RichText text={term.pitfall} />
        </p>
      </div>
      {term.related.length > 0 && (
        <>
          <h3 className="term-section">Termes liés</h3>
          <div className="chips">
            {term.related.map((id) => (
              <button key={id} type="button" className="chip" onClick={() => onSelectTerm(id)}>
                {TERM_BY_ID.get(id)?.term ?? id}
              </button>
            ))}
          </div>
        </>
      )}
      <div className="term-status" role="group" aria-label="Mon niveau sur ce terme">
        <button
          type="button"
          className={`button ${status === "maitrise" ? "button-ok" : "button-ghost"}`}
          aria-pressed={status === "maitrise"}
          onClick={() => setTermStatus(term.id, status === "maitrise" ? null : "maitrise")}
        >
          ✓ Maîtrisé
        </button>
        <button
          type="button"
          className={`button ${status === "a-revoir" ? "button-warn" : "button-ghost"}`}
          aria-pressed={status === "a-revoir"}
          onClick={() => setTermStatus(term.id, status === "a-revoir" ? null : "a-revoir")}
        >
          ↻ À revoir
        </button>
      </div>
    </article>
  );
}
