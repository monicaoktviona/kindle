import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";


export default function Wrapper({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const file = localStorage.getItem("file");
    const vocabStorage = localStorage.getItem("vocab-storage");

    if (!file || !vocabStorage) {
      navigate("/", { replace: true });
      return;
    }

    let vocab;
    try {
      vocab = JSON.parse(vocabStorage);
    } catch {
      navigate("/", { replace: true });
      return;
    }

    if (!vocab?.state?.words) {
      navigate("/", { replace: true });
    }
  }, [navigate]);


  return children;
}
