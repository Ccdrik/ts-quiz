import { useState } from "react";
import { LEVELS, LEVEL_LABELS, THEMES } from "../data";
import { href } from "../lib/router";
import { countDue } from "../lib/srs";
import { themeStats } from "../lib/stats";
import type { Level } from "../types";
import { useProgress } from "./ProgressContext";

const LEVEL_KEY = "ts-quiz:level";

function readLevel(): Level | "tous" {
  try {
    const saved = localStorage.getItem(LEVEL_KEY);
    return LEVELS.some((l) => l.id === saved) ? (saved as Level) : "tous";
  } catch {
    return "tous";
  }
}

export function Home() {
  const { progress } = useProgress();
  const [level, setLevelState] = useState<Level | "tous">(readLevel);
  const due = countDue(progress.questions, Date.now());
  const seen = Object.keys(progress.questions).length;
  const themes = level === "tous" ? THEMES : THEMES.filter((t) => t.level === level);

  function setLevel(value: Level | "tous") {
    setLevelState(value);
    try {
      localStorage.setItem(LEVEL_KEY, value);
    } catch {
      // préférence non mémorisée
    }
  }

  return (
    <div className="home">
      <div className="level-filter" role="group" aria-label="Niveau">
        {[{ id: "tous" as const, label: "Tous" }, ...LEVELS].map((l) => (
          <button
            key={l.id}
            type="button"
            className={`pill${level === l.id ? " is-active" : ""}`}
            aria-pressed={level === l.id}
            onClick={() => setLevel(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="actions">
        <a className="action action-primary" href={href.mixte(level === "tous" ? undefined : level)}>
          <span className="action-icon">🎲</span>
          <span>
            <strong>Session mixte</strong>
            <small>10 questions {level === "tous" ? "tous thèmes" : LEVEL_LABELS[level].toLowerCase()}</small>
          </span>
        </a>
        <a className="action" href={href.revision()} aria-disabled={seen === 0}>
          <span className="action-icon">🔁</span>
          <span>
            <strong>Révisions</strong>
            <small>{seen === 0 ? "Après ta 1ʳᵉ session" : due > 0 ? `${due} à revoir` : "Rien d'urgent"}</small>
          </span>
          {due > 0 && <span className="count">{due}</span>}
        </a>
        <a className="action" href={href.glossary()}>
          <span className="action-icon">📖</span>
          <span>
            <strong>Glossaire</strong>
            <small>Les notions du cours</small>
          </span>
        </a>
        <a className="action" href={href.stats()}>
          <span className="action-icon">📊</span>
          <span>
            <strong>Statistiques</strong>
            <small>Réussite par thème</small>
          </span>
        </a>
      </div>

      <h2 className="section-title">Thèmes</h2>
      <ul className="themes">
        {themes.map((theme) => {
          const stats = themeStats(theme, progress);
          return (
            <li key={theme.id}>
              <a className="theme-card" href={href.theme(theme.id)}>
                <span className="theme-icon">{theme.icon}</span>
                <span className="theme-body">
                  <span className="theme-head">
                    <strong>{theme.title}</strong>
                    <span className={`level level-${theme.level}`}>{LEVEL_LABELS[theme.level]}</span>
                  </span>
                  <small className="muted">{theme.description}</small>
                  <span className="theme-meta">
                    <span className="meter" aria-hidden="true">
                      <span style={{ width: `${stats.rate ?? 0}%` }} />
                    </span>
                    <small>{stats.rate === null ? `${stats.total} questions` : `${stats.rate} % · ${stats.seen}/${stats.total} vues`}</small>
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
