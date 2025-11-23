import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

type GuideCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
};

export function GuideCard({
  title,
  description,
  icon,
  className,
}: GuideCardProps) {
  return (
    <Card
      className={cn("min-h-48 flex flex-col justify-center gap-3", className)}
    >
      <CardHeader>
        {icon}
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-xs">{description}</CardContent>
    </Card>
  );
}
