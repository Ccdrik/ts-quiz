import type { FocusEvent } from "react";

/** Garde le champ actif visible quand le clavier virtuel s'ouvre. */
export function keepVisibleOnFocus(event: FocusEvent<HTMLElement>): void {
  const target = event.currentTarget;
  window.setTimeout(() => {
    target.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
  }, 300);
}

/** Attributs communs à tous les champs de réponse. */
export const answerInputProps = {
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "off",
  spellCheck: false,
} as const;
