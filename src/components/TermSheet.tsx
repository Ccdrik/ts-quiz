import { useEffect, useRef, useState } from "react";
import { TERM_BY_ID } from "../data";
import { TermCard } from "./TermCard";

interface TermSheetProps {
  termId: string | null;
  onClose: () => void;
}

/** Fiche du glossaire en panneau, sans quitter la session de quiz. */
export function TermSheet({ termId, onClose }: TermSheetProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(termId ? [termId] : []);
    const el = dialog.current;
    if (!el) return;
    if (termId && !el.open) el.showModal();
    if (!termId && el.open) el.close();
  }, [termId]);

  const currentId = history[history.length - 1];
  const term = currentId ? TERM_BY_ID.get(currentId) : undefined;

  return (
    <dialog
      ref={dialog}
      className="sheet"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet-bar">
        {history.length > 1 ? (
          <button type="button" className="icon-button" onClick={() => setHistory((h) => h.slice(0, -1))} aria-label="Terme précédent">
            ←
          </button>
        ) : (
          <span />
        )}
        <span className="sheet-title">Glossaire</span>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Fermer">
          ✕
        </button>
      </div>
      <div className="sheet-body">
        {term && <TermCard key={term.id} term={term} onSelectTerm={(id) => setHistory((h) => [...h, id])} />}
      </div>
    </dialog>
  );
}
