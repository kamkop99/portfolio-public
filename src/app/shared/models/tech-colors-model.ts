export interface LinguistLanguage {
  type?: string;
  color?: string;
  extensions?: string[];
  aliases?: string[];
  tm_scope?: string;
  ace_mode?: string;
  language_id?: number;
}

export type LinguistLanguagesMap = Record<string, LinguistLanguage>;
export type TechColorsMap = Record<string, string>;