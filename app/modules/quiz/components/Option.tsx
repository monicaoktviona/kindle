import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { Option } from "../type";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { fetchDefinition } from "~/modules/flashcards/queries/definition";

interface OptionProps {
  handleClickAnswer: (option: Option) => void;
  isAnswered: boolean;
  isPending: boolean;
  option: Option;
}

export default function OptionCard({
  handleClickAnswer,
  isAnswered,
  isPending,
  option,
}: OptionProps) {
  const { t } = useTranslation();
  const {
    data: definition,
    isPending: isDefinitionLoading,
    isError,
  } = useQuery({
    queryKey: ["definition", option.word],
    queryFn: () => fetchDefinition(option.word),
    enabled: option && isAnswered,
  });

  return (
    <>
      <Card
        className={cn(
          "px-4 py-3 min-h-16 w-96 flex flex-col item-center justify-center",
          isAnswered && !isPending
            ? option.isCorrect
              ? "bg-green-100"
              : "bg-red-100"
            : "cursor-pointer hover:bg-gray-50"
        )}
        key={option.word}
        onClick={() => {
          if (!isAnswered && !isPending) handleClickAnswer(option);
        }}
      >
        <>
          <CardContent
            className={cn(
              "text-center font-semibold",
              isAnswered && "text-lg font-bold "
            )}
          >
            {option?.word.toLocaleLowerCase()}
          </CardContent>

          {isAnswered && (
            <CardFooter>
              {isDefinitionLoading ? (
                <Skeleton className="w-54 h-4" />
              ) : isError ? (
                <div className="text-gray-400 text-xs">
                  {t("definitionIsNotAvailable")}
                </div>
              ) : (
                definition && (
                  <div className="text-gray-600 text-xs">
                    {definition[0].meanings[0].definitions[0].definition}
                  </div>
                )
              )}
            </CardFooter>
          )}
        </>
      </Card>
    </>
  );
}
