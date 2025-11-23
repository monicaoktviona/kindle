import type { Thesaurus } from "../type";

export const fetchThesaurus = async (word: string): Promise<Thesaurus> => {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/thesaurus?word=${word}`,
    {
      headers: {
        "X-Api-Key": import.meta.env.VITE_X_API_KEY,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Word not found");
    }
    throw new Error("Network response was not ok");
  }
  const apiResponse: Thesaurus = await response.json();

  return apiResponse;
};
