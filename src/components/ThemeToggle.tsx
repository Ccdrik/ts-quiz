import type { ColorScheme } from "../types";
import { useProgress } from "./ProgressContext";

const NEXT: Record<ColorScheme, ColorScheme> = { system: "light", light: "dark", dark: "system" };
const LABEL: Record<ColorScheme, string> = { system: "Thème : système", light: "Thème : clair", dark: "Thème : sombre" };
const ICON: Record<ColorScheme, string> = { system: "🌓", light: "☀️", dark: "🌙" };

export function ThemeToggle() {
  const { progress, setScheme } = useProgress();
  return (
    <button
      type="button"
      className="icon-button"
      onClick={() => setScheme(NEXT[progress.scheme])}
      aria-label={`${LABEL[progress.scheme]} (changer)`}
      title={LABEL[progress.scheme]}
    >
      {ICON[progress.scheme]}
    </button>
  );
}
