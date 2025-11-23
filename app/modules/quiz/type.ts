export interface Thesaurus {
  word: string;
  synonyms: string[];
  antonyms: string[];
}

export interface Option {
    word: string;
    isCorrect: boolean;
}