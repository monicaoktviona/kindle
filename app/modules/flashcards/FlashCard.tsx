import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import Meanings from "./components/Meanings";
import { fetchDefinition } from "./queries/definition";


interface FlashCardProps {
  word: string;
}

export default function FlashCard({ word }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["definition", word],
    queryFn: () => fetchDefinition(word),
    enabled: isFlipped,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex-1 min-w-[250px] text-center cursor-pointer">
          {word}
        </Card>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md min-h-48 cursor-pointer"
        onClick={() => setIsFlipped((prev) => !prev)}
        showCloseButton={false}
      >
        {isFlipped ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg leading-none font-semibold text-center">
                {word}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-2">
              {data ? (
                <Meanings meanings={data[0].meanings} />
              ) : (
                <div className="flex-1 gap-2">Loading...</div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-1 gap-2 text-center text-2xl font-bold">
              {word.toLocaleLowerCase()}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
