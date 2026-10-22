import { THEMES } from "../data";
import { href } from "../lib/router";
import { themeStats } from "../lib/stats";
import type { Box } from "../types";
import { useProgress } from "./ProgressContext";

const BOXES: Box[] = [1, 2, 3, 4, 5];

export function Stats() {
  const { progress, resetQuestions } = useProgress();
  const all = THEMES.map((theme) => ({ theme, stats: themeStats(theme, progress) }));
  const answered = all.reduce((s, x) => s + x.stats.answered, 0);
  const correct = all.reduce((s, x) => s + x.stats.correct, 0);
  const entries = Object.values(progress.questions);
  const termValues = Object.values(progress.terms);

  return (
    <div className="stats">
      <div className="stat-tiles">
        <div className="tile">
          <strong>{answered === 0 ? "—" : `${Math.round((correct / answered) * 100)} %`}</strong>
          <small>réussite globale</small>
        </div>
        <div className="tile">
          <strong>{answered}</strong>
          <small>réponses</small>
        </div>
        <div className="tile">
          <strong>{termValues.filter((s) => s === "maitrise").length}</strong>
          <small>termes maîtrisés</small>
        </div>
      </div>

      <h2 className="section-title">Par thème</h2>
      <ul className="stat-list">
        {all.map(({ theme, stats }) => (
          <li key={theme.id}>
            <a href={href.theme(theme.id)} className="stat-row">
              <span className="stat-name">
                {theme.icon} {theme.title}
              </span>
              <span className="stat-value">{stats.rate === null ? "—" : `${stats.rate} %`}</span>
              <span className="meter" aria-hidden="true">
                <span style={{ width: `${stats.rate ?? 0}%` }} />
              </span>
              <small className="muted">
                {stats.seen}/{stats.total} questions vues · {stats.answered} réponses
              </small>
            </a>
          </li>
        ))}
      </ul>

      <h2 className="section-title">Répétition espacée</h2>
      <p className="muted small">
        Une erreur renvoie la question en boîte 1 (à revoir tout de suite) ; chaque bonne réponse la fait monter d'une
        boîte et espace son prochain rappel (1, 3, 7 puis 16 jours).
      </p>
      <div className="boxes">
        {BOXES.map((box) => (
          <div key={box} className="box">
            <strong>{entries.filter((p) => p.box === box).length}</strong>
            <small>boîte {box}</small>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="button button-ghost button-danger"
        onClick={() => {
          if (window.confirm("Effacer toute la progression des quiz ? (le glossaire est conservé)")) resetQuestions();
        }}
        disabled={entries.length === 0}
      >
        Réinitialiser la progression
      </button>
    </div>
  );
}
