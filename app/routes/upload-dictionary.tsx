import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Link } from "react-router";
import { readSqlite } from "~/utils/readSql";
import { useVocabStore } from "~/store/vocabStore";
import { Button } from "~/components/ui/button";
import { useTranslation } from "react-i18next";

function UploadDictionary() {
  const { setRows } = useVocabStore();
  const { t } = useTranslation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];
    const buffer = await selectedFile.arrayBuffer();
    const data = await readSqlite(buffer, "SELECT * FROM 'WORDS'");

    setRows(data);
  };

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="dictionary">
          {t("uploadYourKindleDictionaryFile")}
        </Label>
        <Input
          id="dictionary"
          className="cursor-pointer w-96 h-96"
          type="file"
          accept=".db"
          onChange={handleFileChange}
        />
        <div className="flex w-full justify-center gap-4">
          <Button>
            <Link to="/flashcards">{t("goToFlashcards")}</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default UploadDictionary;
