import { expectedAnswer, formatUserAnswer } from "../lib/grading";
import { href } from "../lib/router";
import type { GradeResult, Question, UserAnswer } from "../types";
import { CodeBlock } from "./CodeBlock";
import { RichText } from "./RichText";

export interface AnsweredQuestion {
  question: Question;
  answer: UserAnswer;
  result: GradeResult;
}

function message(rate: number): string {
  if (rate === 1) return "Sans faute, bravo ! 🏆";
  if (rate >= 0.8) return "Très bien joué ! 💪";
  if (rate >= 0.5) return "Pas mal, continue comme ça ! 👍";
  return "Courage, les révisions vont t'aider ! 📚";
}

export function SessionSummary({ history, onRestart }: { history: AnsweredQuestion[]; onRestart: () => void }) {
  const score = history.filter((h) => h.result.correct).length;
  const mistakes = history.filter((h) => !h.result.correct);

  return (
    <div className="summary">
      <div className="score">
        <p className="score-value">
          {score} <span>/ {history.length}</span>
        </p>
        <p>{message(history.length === 0 ? 0 : score / history.length)}</p>
      </div>

      {mistakes.length > 0 && (
        <section>
          <h2 className="section-title">Erreurs à revoir ({mistakes.length})</h2>
          <ul className="mistakes">
            {mistakes.map(({ question, answer }) => (
              <li key={question.id} className="mistake">
                <p className="mistake-prompt">
                  <RichText text={question.type === "truefalse" ? question.statement : question.prompt} />
                </p>
                {question.code && <CodeBlock compact source={question.code.source} lang={question.code.lang} />}
                {question.type === "blank" && <CodeBlock compact source={question.template} lang={question.lang} />}
                <p className="small">
                  <span className="wrong">✗ {formatUserAnswer(question, answer)}</span>
                  <br />
                  <span className="right">
                    ✓ <RichText text={expectedAnswer(question)} />
                  </span>
                </p>
                <p className="small muted">
                  <RichText text={question.explanation} />
                </p>
              </li>
            ))}
          </ul>
          <p className="muted small">Ces questions reviendront plus souvent dans le mode Révisions.</p>
        </section>
      )}

      <div className="action-bar action-bar-split">
        <a className="button button-ghost" href={href.home()}>
          Accueil
        </a>
        <button type="button" className="button button-primary" onClick={onRestart}>
          Nouvelle session
        </button>
      </div>
    </div>
  );
}
