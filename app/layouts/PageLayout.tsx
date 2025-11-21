import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({
  children,
  className = "",
}: PageLayoutProps) {
  return (
    <div className="max-w-8xl min-h-screen mx-auto px-6 py-4 flex flex-col justify-start items-center">
      <div className={className}>{children}</div>
    </div>
  );
}
