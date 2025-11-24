import "~/styles/flipcard.css";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Volume2Icon } from "components/ui/icons/lucide-volume-2";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Skeleton } from "~/components/ui/skeleton";

import Meanings from "./components/Meanings";
import { fetchDefinition } from "./queries/definition";

interface FlashCardProps {
  word: string;
}

export default function FlashCard({ word }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation();

  const { data: definition, isPending: isDefinitionLoading } = useQuery({
    queryKey: ["definition", word],
    queryFn: () => fetchDefinition(word),
    enabled: isFlipped,
    meta: {
      errorMessage: t("failedToFetchWordDefinition"),
    },
  });

  const audioUrl = definition?.[0]?.phonetics?.[0]?.audio;
  const playAudio = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    const audioElement = new Audio(audioUrl);
    audioElement.play();
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setIsFlipped(false)}>
        <Card className="flex-1 min-w-48 text-center cursor-pointer">
          {word.toLocaleLowerCase()}
        </Card>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md cursor-pointer flip-card-container w-full h-64"
        onClick={() => setIsFlipped((prev) => !prev)}
        showCloseButton={false}
      >
        <motion.div
          className="flip-card-inner w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flip-card-back flex flex-col gap-1 justify-center">
            <DialogHeader className="relative flex flex-col items-center">
              <DialogTitle className="text-xl leading-none font-semibold text-center">
                {word.toLocaleLowerCase()}
              </DialogTitle>
              {definition && audioUrl && (
                <Volume2Icon
                  className="absolute right-0 top-0 w-6 h-6"
                  onClick={playAudio}
                />
              )}
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Meanings
                isLoading={isDefinitionLoading}
                meanings={definition?.[0]?.meanings}
              />
            </div>
            <DialogFooter>
              <div className="w-full">
                {isDefinitionLoading && <Skeleton className="h-4 w-full" />}
                {definition && (
                  <>
                    <div className="text-[11px] font-semibold text-gray-700">
                      {t("source")}:
                    </div>
                    <div className="flex flex-col gap-0">
                      <div className="text-[10px] text-gray-500">
                        {definition[0].sourceUrls.join(", ")}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </DialogFooter>
          </div>
          <div className="flex items-center gap-2 flip-card-front w-full h-full">
            <div className="flex-1 gap-2 text-center text-2xl font-bold">
              {word.toLocaleLowerCase()}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
