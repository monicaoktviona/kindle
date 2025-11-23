import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { VocabularyWord } from "~/modules/upload-dictionary/type";

interface VocabState {
  words: VocabularyWord[] | null;
  setWords: (words: VocabularyWord[] | null) => void;
}

export const useVocabStore = create<VocabState>()(
  persist(
    (set) => ({
      words: null,
      setWords: (words: VocabularyWord[] | null) => set({ words }),
    }),
    {
      name: "vocab-storage",
    }
  )
);
