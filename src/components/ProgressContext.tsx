import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { review } from "../lib/srs";
import { emptyProgress, loadProgress, saveProgress } from "../lib/storage";
import type { ColorScheme, Progress, TermStatus } from "../types";

interface ProgressApi {
  progress: Progress;
  recordAnswer: (questionId: string, correct: boolean) => void;
  setTermStatus: (termId: string, status: TermStatus | null) => void;
  setScheme: (scheme: ColorScheme) => void;
  resetQuestions: () => void;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => saveProgress(progress), [progress]);

  useEffect(() => {
    const root = document.documentElement;
    if (progress.scheme === "system") delete root.dataset.theme;
    else root.dataset.theme = progress.scheme;
  }, [progress.scheme]);

  const recordAnswer = useCallback((questionId: string, correct: boolean) => {
    setProgress((p) => ({
      ...p,
      questions: { ...p.questions, [questionId]: review(p.questions[questionId], correct, Date.now()) },
    }));
  }, []);

  const setTermStatus = useCallback((termId: string, status: TermStatus | null) => {
    setProgress((p) => {
      const terms = { ...p.terms };
      if (status === null) delete terms[termId];
      else terms[termId] = status;
      return { ...p, terms };
    });
  }, []);

  const setScheme = useCallback((scheme: ColorScheme) => setProgress((p) => ({ ...p, scheme })), []);

  const resetQuestions = useCallback(
    () => setProgress((p) => ({ ...emptyProgress(), terms: p.terms, scheme: p.scheme })),
    [],
  );

  const api = useMemo(
    () => ({ progress, recordAnswer, setTermStatus, setScheme, resetQuestions }),
    [progress, recordAnswer, setTermStatus, setScheme, resetQuestions],
  );
  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const api = useContext(ProgressContext);
  if (!api) throw new Error("useProgress doit être utilisé dans <ProgressProvider>");
  return api;
}
