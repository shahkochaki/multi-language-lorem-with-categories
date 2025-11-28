// Type definitions for the extension

export type LanguageKey =
  | "english"
  | "persian"
  | "arabic"
  | "chinese"
  | "japanese"
  | "russian"
  | "spanish"
  | "french"
  | "german"
  | "italian"
  | "portuguese"
  | "korean"
  | "hindi"
  | "turkish"
  | "dutch"
  | "swedish"
  | "norwegian";

export type CategoryKey =
  | "tourism"
  | "medical"
  | "technology"
  | "business"
  | "education"
  | "food"
  | "sports"
  | "finance"
  | "environment"
  | "entertainment";

export type LengthKey = "short" | "medium" | "long";

export interface Category {
  label: string;
  value: CategoryKey;
  icon: string;
}

export interface Length {
  label: string;
  value: LengthKey;
}

export interface LoremHistoryItem {
  id: string;
  timestamp: number;
  language: LanguageKey;
  category: CategoryKey;
  length: LengthKey;
  text: string;
}

export interface CustomTemplate {
  id: string;
  name: string;
  language: LanguageKey;
  category: CategoryKey;
  length: LengthKey;
  created: number;
}

export interface LoremData {
  [language: string]: {
    [category: string]: {
      [length: string]: string | string[];
    };
  };
}
