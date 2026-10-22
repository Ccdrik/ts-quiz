import type { GradeResult, Question, QuestionFormat, UserAnswer } from "../types";
import { assertNever } from "../lib/grading";
import { CodeBlock } from "./CodeBlock";
import { RichText } from "./RichText";
import { BlankQuestion } from "./questions/BlankQuestion";
import { FreeQuestion } from "./questions/FreeQuestion";
import { McqQuestion } from "./questions/McqQuestion";
import { TrueFalseQuestion } from "./questions/TrueFalseQuestion";

const FORMAT_LABELS: Record<QuestionFormat, string> = {
  nommer: "Nommer l'élément",
  erreur: "Trouver l'erreur",
  inference: "Quel est le type inféré ?",
  notion: "Notion",
};

interface QuestionViewProps {
  question: Question;
  answer: UserAnswer | null;
  onChange: (answer: UserAnswer) => void;
  result: GradeResult | null;
  onSubmit: () => void;
}

export function QuestionView(props: QuestionViewProps) {
  const { question } = props;
  return (
    <section className="question" aria-live="polite">
      <span className={`badge badge-${question.format}`}>{FORMAT_LABELS[question.format]}</span>
      <h2 className="question-prompt">
        <RichText text={question.prompt} />
      </h2>
      {question.code && <CodeBlock source={question.code.source} lang={question.code.lang} />}
      <AnswerInput {...props} />
    </section>
  );
}

function AnswerInput({ question, ...rest }: QuestionViewProps) {
  switch (question.type) {
    case "blank":
      return <BlankQuestion question={question} {...rest} />;
    case "free":
      return <FreeQuestion question={question} {...rest} />;
    case "mcq":
      return <McqQuestion question={question} {...rest} />;
    case "truefalse":
      return <TrueFalseQuestion question={question} {...rest} />;
    default:
      return assertNever(question);
  }
}
