import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

import { useVocabStore } from "~/store/vocabStore";

export default function Wrapper({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const words = useVocabStore((state) => state.words);

  useEffect(() => {
    const file = localStorage.getItem("file");

    if (!words || !file) {
      navigate("/", { replace: true });
    }
  }, [words, navigate]);

  return children;
}
