import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { VocabularyWord } from "~/modules/upload-dictionary/type";


interface VocabState {
  rows: VocabularyWord[] | null;
  setRows: (rows: VocabularyWord[]) => void;
}

export const useVocabStore = create<VocabState>()(
  persist(
    (set) => ({
      rows: null,
      setRows: (rows: VocabularyWord[]) => set({ rows }),
    }),
    {
      name: "vocab-storage",
    }
  )
);
