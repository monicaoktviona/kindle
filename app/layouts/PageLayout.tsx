import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  navbar: boolean;
}

export default function PageLayout({
  children,
  navbar,
  className,
}: PageLayoutProps) {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Flashcards", to: "/flashcards" },
    { label: "Quiz", to: "/quiz" },
  ];

  return (
    <div
      className={cn(
        "w-full min-h-screen mx-auto box-border flex flex-row justify-center items-centers my-10",
        className
      )}
    >
      {navbar && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b py-4 border-b-gray-50">
          <div className="w-full flex flex-col items-center justify-center">
            <NavigationMenu className="w-full">
              <NavigationMenuList className="flex w-full gap-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.to;

                  return (
                    <NavigationMenuItem key={item.to}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive &&
                            "pointer-events-none opacity-50 cursor-not-allowed"
                        )}
                      >
                        <Link to={item.to}>{item.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}

      <div
        className={cn(
          navbar && "pt-16",
          "max-w-4xl flex flex-col items-center justify-center gap-4 "
        )}
      >
        {children}
      </div>
    </div>
  );
}
