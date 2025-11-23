import type { ReactNode } from "react";

import { cn } from "~/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={cn(
        className,
        "max-w-4xl min-h-screen mx-auto px-6 py-12 box-border"
      )}
    >
      {children}
    </div>
  );
}
