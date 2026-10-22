export interface NormalizeOptions {
  caseSensitive?: boolean;
}

/** Symboles autour desquels les espaces ne comptent pas : `Array< string >` = `Array<string>`. */
const SPACED_SYMBOLS = /\s*([<>()[\]{},:;|&=?!+\-*/%.])\s*/g;

/**
 * Met une réponse sous une forme canonique avant comparaison :
 * casse, accents, espaces superflus, apostrophes et point-virgule final ignorés.
 */
export function normalize(input: string, options: NormalizeOptions = {}): string {
  let s = input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’‘`´]/g, "'")
    .replace(/'/g, '"')
    .replace(/ /g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(SPACED_SYMBOLS, "$1")
    .replace(/;+$/, "")
    .trim();
  if (!options.caseSensitive) s = s.toLowerCase();
  return s;
}

export function matches(
  input: string,
  accepted: readonly string[],
  options: NormalizeOptions = {},
): boolean {
  const given = normalize(input, options);
  if (given === "") return false;
  return accepted.some((answer) => normalize(answer, options) === given);
}
