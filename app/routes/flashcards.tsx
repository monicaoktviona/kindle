import PageLayout from "~/layouts/PageLayout";
import FlashCard from "~/modules/flashcards/FlashCard";
import { useVocabStore } from "~/store/vocabStore";

function FlashCards() {
  const rows = useVocabStore((state) => state.rows);

  return (
    <PageLayout className="space-y-6">
      <h1 className="text-center font-bold text-2xl">Flashcards</h1>
      <div className="flex flex-col">
        <div className="flex-1 p-4 flex flex-wrap gap-4">
          {rows?.map((row) => (
            <FlashCard key={row.id} word={row.word} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default FlashCards;
