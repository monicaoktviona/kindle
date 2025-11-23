import { useRef, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { CloudUpload, Database, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import PageLayout from "~/layouts/PageLayout";
import { cn } from "~/lib/utils";
import Guide from "~/modules/upload-dictionary/GuideSection";
import type { VocabularyWord } from "~/modules/upload-dictionary/type";
import { useVocabStore } from "~/store/vocabStore";
import { readSqlite } from "~/utils/readSql";

function UploadDictionary() {
  const [fileName, setFileName] = useLocalStorage<string | null>("file", null);
  const [isDragging, setDragging] = useState(false);

  const setWords = useVocabStore((state) => state.setWords);
  const words = useVocabStore((state) => state.words);

  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setFileName(file.name);

    const buffer = await file.arrayBuffer();
    const data = await readSqlite(buffer, "SELECT * FROM words");
    setWords(data as VocabularyWord[]);
  }

  const useExampleFile = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const response = await fetch("/vocab.db");
    const blob = await response.blob();
    const file = new File([blob], "example.db", { type: blob.type });
    handleFile(file);
  };

  function removeFile(e: React.MouseEvent<SVGSVGElement>) {
    e.stopPropagation();

    setFileName(null);
    setWords(null);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <PageLayout
      className="flex flex-col items-center justify-start"
      navbar={false}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <Label className="font-bold text-md text-center" htmlFor="dictionary">
          {t("uploadYourKindleDictionaryFile")}
        </Label>
        <Input
          accept=".db"
          className="hidden"
          id="dictionary"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          ref={fileInputRef}
          type="file"
        />
        <div
          className={cn(
            "relative w-84 md:w-96 h-64 flex flex-col justify-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer",
            "transition-colors",
            isDragging
              ? "border-gray-500 bg-gray-50"
              : "border-muted-foreground/30 hover:bg-muted/30"
          )}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={() => setDragging(true)}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="text-sm text-muted-foreground">
            {fileName === null ? (
              <div className="flex flex-col items-center gap-2">
                <CloudUpload color="#b0b0b0" size={100} strokeWidth={0.5} />
                <div>{t("dragDropOrClickToUpload")}</div>
                <div
                  className="text-blue-500 underline text-xs"
                  onClick={useExampleFile}
                >
                  {t("tryUsingASampleFile")}
                </div>
              </div>
            ) : words === null ? (
              <div>{t("uploading")}</div>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <Database color="#b0b0b0" size={100} strokeWidth={0.5} />
                  <div>{fileName}</div>
                </div>
                <X
                  className="absolute top-2 right-2"
                  onClick={removeFile}
                  size={18}
                />
              </>
            )}
          </div>
        </div>

        {fileName && (
          <div className="flex flex-row gap-4">
            <div className="flex w-full justify-center gap-4">
              <Button>
                <Link to="/flashcards">{t("goToFlashcards")}</Link>
              </Button>
            </div>
            <div className="flex w-full justify-center gap-4">
              <Button>
                <Link to="/quiz">{t("tryQuiz")}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      <Guide />
    </PageLayout>
  );
}

export default UploadDictionary;
