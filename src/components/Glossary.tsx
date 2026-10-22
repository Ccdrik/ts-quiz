import { useMemo, useState } from "react";
import { TERM_BY_ID, THEMES } from "../data";
import { normalize } from "../lib/normalize";
import { href, navigate } from "../lib/router";
import type { GlossaryTerm, TermStatus } from "../types";
import { useProgress } from "./ProgressContext";
import { TermCard } from "./TermCard";
import { answerInputProps } from "./focus";

type Filter = "tous" | TermStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "a-revoir", label: "À revoir" },
  { id: "maitrise", label: "Maîtrisés" },
];

function searchable(term: GlossaryTerm): string {
  return normalize(`${term.term} ${term.definition}`);
}

export function Glossary({ termId }: { termId?: string | undefined }) {
  const { progress } = useProgress();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("tous");

  const groups = useMemo(() => {
    const q = normalize(query);
    return THEMES.map((theme) => ({
      theme,
      terms: theme.glossary
        .filter((t) => q === "" || searchable(t).includes(q))
        .filter((t) => filter === "tous" || progress.terms[t.id] === filter)
        .sort((a, b) => a.term.localeCompare(b.term, "fr")),
    })).filter((g) => g.terms.length > 0);
  }, [query, filter, progress.terms]);

  if (termId !== undefined) {
    const term = TERM_BY_ID.get(termId);
    return term ? (
      <TermCard key={term.id} term={term} onSelectTerm={(id) => navigate(href.glossary(id))} />
    ) : (
      <p className="empty">Terme introuvable.</p>
    );
  }

  return (
    <div className="glossary">
      <input
        type="search"
        className="search"
        placeholder="Rechercher un terme…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Rechercher dans le glossaire"
        {...answerInputProps}
      />
      <div className="level-filter" role="group" aria-label="Filtrer">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`pill${filter === f.id ? " is-active" : ""}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {groups.length === 0 && <p className="empty">Aucun terme ne correspond.</p>}
      {groups.map(({ theme, terms }) => (
        <section key={theme.id}>
          <h2 className="section-title">
            {theme.icon} {theme.title}
          </h2>
          <ul className="term-list">
            {terms.map((t) => {
              const status = progress.terms[t.id];
              return (
                <li key={t.id}>
                  <a className="term-row" href={href.glossary(t.id)}>
                    <span>{t.term}</span>
                    {status === "maitrise" && <span className="tag tag-ok">Maîtrisé</span>}
                    {status === "a-revoir" && <span className="tag tag-warn">À revoir</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
