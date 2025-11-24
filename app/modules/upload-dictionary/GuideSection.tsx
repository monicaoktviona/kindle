import { CloudUpload } from "lucide-react";
import { SquareStack } from "lucide-react";
import { ListCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { GuideCard } from "./GuideCard";

export default function Guide() {
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <div className="font-bold text-md mb-4 text-center">
        {t("howItWorks")}
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 px-6 lg:px-0">
        <GuideCard
          className="lg:flex-1 w-full"
          description={t("uploadDescription")}
          icon={<CloudUpload color="black" size={30} strokeWidth={1.5} />}
          title={t("upload")}
        ></GuideCard>
        <GuideCard
          className="lg:flex-1 w-full"
          description={t("practiceDescription")}
          icon={<SquareStack color="black" size={30} strokeWidth={1.5} />}
          title={t("practice")}
        ></GuideCard>
        <GuideCard
          className="lg:flex-1 w-full"
          description={t("quizDescription")}
          icon={<ListCheck color="black" size={30} strokeWidth={1.5} />}
          title={t("quiz")}
        ></GuideCard>
      </div>
    </div>
  );
}
