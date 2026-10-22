import { alternativeAnswers, expectedAnswer } from "../lib/grading";
import { fillSnippet } from "../lib/snippet";
import { TERM_BY_ID } from "../data";
import type { GradeResult, Question } from "../types";
import { CodeBlock } from "./CodeBlock";
import { RichText } from "./RichText";

interface FeedbackProps {
  question: Question;
  result: GradeResult;
  onOpenTerm: (termId: string) => void;
}

export function Feedback({ question, result, onOpenTerm }: FeedbackProps) {
  const alternatives = alternativeAnswers(question);
  return (
    <section className={`feedback ${result.correct ? "feedback-ok" : "feedback-ko"}`} tabIndex={-1} id="feedback">
      <p className="feedback-title">{result.correct ? "✅ Bonne réponse !" : "❌ Pas tout à fait"}</p>

      {!result.correct &&
        (question.type === "blank" ? (
          <>
            <p className="feedback-label">Réponse attendue :</p>
            <CodeBlock
              compact
              lang={question.lang}
              source={fillSnippet(question.template, question.blanks.map((b) => b[0] ?? ""))}
            />
          </>
        ) : (
          <p>
            <span className="feedback-label">Réponse attendue : </span>
            <strong>
              <RichText text={expectedAnswer(question)} />
            </strong>
          </p>
        ))}
      {alternatives.length > 0 && (
        <p className="muted small">Aussi accepté : {alternatives.join(" · ")}</p>
      )}

      <p className="feedback-explanation">
        <RichText text={question.explanation} />
      </p>
      {question.example && <CodeBlock compact source={question.example} />}

      <div className="chips" aria-label="Termes du glossaire liés">
        <span className="chips-label">📖</span>
        {question.glossary.map((id) => (
          <button key={id} type="button" className="chip" onClick={() => onOpenTerm(id)}>
            {TERM_BY_ID.get(id)?.term ?? id}
          </button>
        ))}
      </div>
    </section>
  );
}
