import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useQuiz } from "~/hooks/useQuiz";
import PageLayout from "~/layouts/PageLayout";
import OptionCard from "~/modules/quiz/components/Option";
import { NUMBER_OF_QUESTIONS } from "~/modules/quiz/constants";

function Quiz() {
  const { t } = useTranslation();

  const {
    word,
    options,
    questionNumber,
    isAnswered,
    score,
    isPending,
    startQuiz,
    restartQuiz,
    handleClickAnswer,
    handleNextQuestion,
  } = useQuiz();

  return (
    <PageLayout
      className="flex flex-col items-center justify-start gap-4"
      navbar={true}
    >
      <h1 className="text-xl font-bold">{t("quiz")}</h1>
      {questionNumber === -1 && (
        <Button className="cursor-pointer" onClick={startQuiz}>
          {t("startQuiz")}
        </Button>
      )}

      {questionNumber === NUMBER_OF_QUESTIONS && (
        <>
          <div>
            {t("yourScore")}: {score}
          </div>
          <Button className="cursor-pointer" onClick={restartQuiz}>
            {t("tryAgain")}
          </Button>
        </>
      )}

      {questionNumber >= 0 && questionNumber < NUMBER_OF_QUESTIONS && (
        <>
          <div className="text-lg font-bold">
            {t("question")} {questionNumber + 1}
          </div>

          {isPending ? (
            <Skeleton className="w-96 h-6" />
          ) : (
            word &&
            options && (
              <div className="mt-2">
                {t("selectTheWordThatIs")} <strong>{t("not")}</strong>{" "}
                {t("aSynonymOf")}{" "}
                <span className="font-bold">{word.toLowerCase()}</span>
              </div>
            )
          )}

          <div className="flex flex-col gap-4">
            {isPending ? (
              <>
                <Skeleton className="w-96 h-16" />
                <Skeleton className="w-96 h-16" />
                <Skeleton className="w-96 h-16" />
                <Skeleton className="w-96 h-16" />
              </>
            ) : (
              options?.map((option, idx) => (
                <OptionCard
                  key={idx}
                  option={option}
                  isAnswered={isAnswered}
                  isPending={isPending}
                  handleClickAnswer={handleClickAnswer}
                />
              ))
            )}
          </div>

          {isAnswered && (
            <Button className="cursor-pointer" onClick={handleNextQuestion}>
              {questionNumber === NUMBER_OF_QUESTIONS - 1
                ? t("finish")
                : t("nextQuestion")}
            </Button>
          )}
        </>
      )}
    </PageLayout>
  );
}

export default Quiz;
