import type { WordDefinition } from "../type";

export const fetchDefinition = async (
  word: string
): Promise<WordDefinition> => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Word not found");
    }
    throw new Error("Network response was not ok");
  }
  const apiResponse: WordDefinition = await response.json();

  return apiResponse;
};
