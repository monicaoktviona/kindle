import { useEffect, useMemo, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import PageLayout from "~/layouts/PageLayout";
import { VocabForm } from "~/modules/flashcards/components/form";
import FlashcardPagination from "~/modules/flashcards/components/Pagination";
import { ITEMS_PER_PAGE } from "~/modules/flashcards/constants";
import FlashCard from "~/modules/flashcards/FlashCard";
import { type VocabularyWord } from "~/modules/upload-dictionary/type";
import { useVocabStore } from "~/store/vocabStore";

function FlashCards() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const [displayedWords, setDisplayedWords] = useState<VocabularyWord[] | null>(
    null
  );

  const words = useVocabStore((state) => state.words);
  const totalPages = useMemo(
    () => (words ? Math.ceil(words.length / ITEMS_PER_PAGE) : 0),
    [words]
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (!words) return;

    const firstIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastIdx = currentPage * ITEMS_PER_PAGE - 1;

    setDisplayedWords(words?.slice(firstIdx, lastIdx + 1));
  }, [words, currentPage]);

  return (
    <>
      <PageLayout
        className="space-y-6 flex flex-col justify-center items-center"
        navbar={true}
      >
        <h1 className="text-center font-bold text-2xl">Flashcards</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">{t("addNewWord")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-center text-lg font-bold">
              {t("addNewWord")}
            </DialogTitle>
            <VocabForm setOpenModal={setOpen} setCurrentPage={setCurrentPage} />
          </DialogContent>
        </Dialog>
        <div className="flex flex-col justify-center items-center w-full max-w-4xl">
          <div className="flex-1 p-4 flex flex-wrap gap-4">
            {displayedWords?.map((row) => (
              <FlashCard key={row.id} word={row.word} />
            ))}
          </div>
          <FlashcardPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </PageLayout>
    </>
  );
}

export default FlashCards;
