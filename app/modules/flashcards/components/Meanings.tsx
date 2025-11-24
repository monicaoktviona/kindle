import type { Definition, Meaning } from "../type";
import { Skeleton } from "~/components/ui/skeleton";

export default function Meanings({
  meanings,
  isLoading,
}: {
  meanings: Meaning[] | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-36 w-full">
      {isLoading && (
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-36 w-full" />
        </div>
      )}
      {!isLoading &&
        meanings?.map((meaning: Meaning, index) => (
          <div key={index} className="text-left px-4">
            <div className="font-semibold">{meaning.partOfSpeech}</div>
            <ul className="list-disc list-inside space-y-1">
              {meaning.definitions.map((def: Definition, index) => (
                <li key={index} className="text-gray-700 text-sm">
                  {def.definition}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
