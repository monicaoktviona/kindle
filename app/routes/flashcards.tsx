import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import PageLayout from "~/layouts/PageLayout";
import { VocabForm } from "~/modules/flashcards/components/form";
import FlashCard from "~/modules/flashcards/FlashCard";
import { useVocabStore } from "~/store/vocabStore";

function FlashCards() {
  const [open, setOpen] = useState(false);
  const rows = useVocabStore((state) => state.rows);
  const { t } = useTranslation();

  return (
    <>
      <PageLayout className="space-y-6 flex flex-col justify-center items-center">
        <h1 className="text-center font-bold text-2xl">Flashcards</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">{t("addNewWord")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-center text-lg font-bold">
              {i18next.t("addNewWord")}
            </DialogTitle>
            <VocabForm setOpenModal={setOpen} />
          </DialogContent>
        </Dialog>
        <div className="flex flex-col justify-center items-center w-full max-w-4xl">
          <div className="flex-1 p-4 flex flex-wrap gap-4">
            {rows?.map((row) => (
              <FlashCard key={row.id} word={row.word} />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export default FlashCards;
