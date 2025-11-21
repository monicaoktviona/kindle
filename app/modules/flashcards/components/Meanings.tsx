import type { Meaning } from "../type";

export default function Meanings({ meanings }: { meanings: Meaning[] }) {
  return (
    <div  className="flex flex-col gap-4 overflow-y-auto max-h-96">
      {meanings.map((meaning: Meaning) => (
        <div>
          <div className="font-semibold">{meaning.partOfSpeech}</div>
          <ul className="list-disc list-inside space-y-1">
            {meaning.definitions.map((def) => (
              <li className="text-gray-700 text-sm">{def.definition}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
