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
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <GuideCard
          className="lg:flex-1"
          title={t("upload")}
          description={t("uploadDescription")}
          icon={<CloudUpload color="black" size={30} strokeWidth={1.5} />}
        ></GuideCard>
        <GuideCard
          className="lg:flex-1"
          title={t("practice")}
          description={t("practiceDescription")}
          icon={<SquareStack color="black" size={30} strokeWidth={1.5} />}
        ></GuideCard>
        <GuideCard
          className="lg:flex-1"
          title={t("quiz")}
          description={t("quizDescription")}
          icon={<ListCheck color="black" size={30} strokeWidth={1.5} />}
        ></GuideCard>
      </div>
    </div>
  );
}
