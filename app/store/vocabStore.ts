import type { VocabularyWord } from "~/modules/upload-dictionary/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VocabState {
  rows: VocabularyWord[] | null;
  setRows: (rows: VocabularyWord[]) => void;
}

export const useVocabStore = create<VocabState>()(
  persist(
    (set) => ({
      rows: null,
      setRows: (rows) => set({ rows }),
    }),
    {
      name: "vocab-storage",
    }
  )
);
