import FlashCard from "~/modules/flashcards/FlashCard";
import { useVocabStore } from "~/store/vocabStore";

function FlashCards() {
  const rows = useVocabStore((state) => state.rows);

  return (
    <div className="w-screen flex flex-col">
      <div className="flex-1 p-4 flex flex-wrap gap-4">
        {rows?.map((row) => (
          <FlashCard key={row.id} word={row.word} />
        ))}
      </div>
    </div>
  );
}

export default FlashCards;
