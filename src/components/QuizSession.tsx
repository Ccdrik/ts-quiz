import { useState } from "react";
import { LEVEL_LABELS, THEME_BY_ID, THEMES } from "../data";
import { grade, isComplete } from "../lib/grading";
import { href } from "../lib/router";
import { buildSession, type SessionRequest } from "../lib/session";
import type { GradeResult, Question, UserAnswer } from "../types";
import { Feedback } from "./Feedback";
import { useProgress } from "./ProgressContext";
import { QuestionView } from "./QuestionView";
import { SessionSummary, type AnsweredQuestion } from "./SessionSummary";
import { TermSheet } from "./TermSheet";

export function sessionTitle(request: SessionRequest): string {
  switch (request.mode) {
    case "theme":
      return THEME_BY_ID.get(request.theme)?.title ?? "Quiz";
    case "mixte":
      return request.level ? `Session mixte · ${LEVEL_LABELS[request.level]}` : "Session mixte";
    case "revision":
      return "Révisions";
  }
}

export function QuizSession({ request }: { request: SessionRequest }) {
  const [round, setRound] = useState(0);
  return <Round key={round} request={request} onRestart={() => setRound((r) => r + 1)} />;
}

function Round({ request, onRestart }: { request: SessionRequest; onRestart: () => void }) {
  const { progress, recordAnswer } = useProgress();
  const [questions] = useState<Question[]>(() => buildSession(request, THEMES, progress, Date.now()));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<UserAnswer | null>(null);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [history, setHistory] = useState<AnsweredQuestion[]>([]);
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  if (questions.length === 0) {
    return (
      <div className="empty">
        <p className="empty-icon">🎉</p>
        <p>
          {request.mode === "revision"
            ? "Rien à réviser pour l'instant : réponds d'abord à quelques questions, elles reviendront ici."
            : "Aucune question disponible pour ce choix."}
        </p>
        <a className="button button-primary" href={href.home()}>
          Retour à l'accueil
        </a>
      </div>
    );
  }

  if (index >= questions.length) {
    return <SessionSummary history={history} onRestart={onRestart} />;
  }

  const question = questions[index];
  if (!question) return null;
  const isLast = index === questions.length - 1;

  function validate() {
    if (result !== null || !question || !isComplete(answer)) return;
    const graded = grade(question, answer);
    setResult(graded);
    recordAnswer(question.id, graded.correct);
    setHistory((h) => [...h, { question, answer, result: graded }]);
    // ferme le clavier puis montre la correction
    (document.activeElement as HTMLElement | null)?.blur();
    window.setTimeout(() => {
      document.getElementById("feedback")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function next() {
    setIndex((i) => i + 1);
    setAnswer(null);
    setResult(null);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <span>
          Question {index + 1} / {questions.length}
        </span>
        <span className="muted">{THEME_BY_ID.get(question.theme)?.icon}</span>
      </div>
      <div className="progress-bar" aria-hidden="true">
        <div style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      <QuestionView key={question.id} question={question} answer={answer} onChange={setAnswer} result={result} onSubmit={validate} />

      {result && <Feedback question={question} result={result} onOpenTerm={setOpenTerm} />}

      <div className="action-bar">
        {result === null ? (
          <button type="button" className="button button-primary button-block" onClick={validate} disabled={!isComplete(answer)}>
            Valider
          </button>
        ) : (
          <button type="button" className="button button-primary button-block" onClick={next} autoFocus>
            {isLast ? "Voir le résultat" : "Question suivante →"}
          </button>
        )}
      </div>

      <TermSheet termId={openTerm} onClose={() => setOpenTerm(null)} />
    </div>
  );
}
