import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { NUMBER_OF_QUESTIONS } from "~/modules/quiz/constants";
import { fetchThesaurus } from "~/modules/quiz/queries/thesaurus";
import { type Option } from "~/modules/quiz/type";
import { useVocabStore } from "~/store/vocabStore";

export function useQuiz() {
  const [word, setWord] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[] | null>(null);
  const [questionNumber, setQuestionNumber] = useState(-1);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isPending, setIsPending] = useState(true);

  const words = useVocabStore((state) => state.words);

  const { data: thesaurus } = useQuery({
    queryKey: ["thesaurus", word],
    queryFn: () => (word ? fetchThesaurus(word) : null),
    enabled: !!word,
  });

  const pickRandom = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const generateQuestion = useCallback(() => {
    if (!words?.length) return;

    setIsPending(true);

    const pool = words.map((w) => w.word);
    setOptions(null);
    setWord(pickRandom(pool));
  }, [words]);

  useEffect(() => {
    if (questionNumber >= 0 && questionNumber < NUMBER_OF_QUESTIONS) {
      generateQuestion();
    }
  }, [questionNumber, generateQuestion]);

  const generateOptions = useCallback(
    (syns: string[]) => {
      if (!thesaurus || !words) return;

      const incorrect = syns.slice(0, 3).map((s) => ({
        word: s,
        isCorrect: false,
      }));

      let correct =
        thesaurus.antonyms?.find(
          (a) => typeof a === "string" && a.trim() !== ""
        ) || null;

      if (!correct) {
        const blacklist = new Set([word, ...syns]);
        const pool = words.map((w) => w.word).filter((w) => !blacklist.has(w));

        correct = pickRandom(pool) || "none";
      }

      const correctOption = { word: correct, isCorrect: true };
      const all = [...incorrect, correctOption];

      const result: Option[] = [];
      const idx = [0, 1, 2, 3];

      all.forEach((item) => {
        const r = Math.floor(Math.random() * idx.length);
        result[idx[r]] = item;
        idx.splice(r, 1);
      });

      setOptions(result);
      setIsPending(false);
    },
    [thesaurus, words, word]
  );

  useEffect(() => {
    if (!thesaurus) return;

    const validSyns =
      thesaurus.synonyms?.filter(
        (x) => typeof x === "string" && x.trim() !== ""
      ) || [];

    if (validSyns.length < 3) {
      generateQuestion();
      return;
    }

    generateOptions(validSyns);
  }, [thesaurus, generateQuestion, generateOptions]);

  const handleClickAnswer = (option: Option) => {
    if (option.isCorrect) setScore((prev) => prev + 10);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setQuestionNumber((p) => p + 1);
  };

  const startQuiz = () => {
    setScore(0);
    setQuestionNumber(0);
  };

  const restartQuiz = () => {
    setScore(0);
    setQuestionNumber(0);
  };

  return {
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
  };
}
