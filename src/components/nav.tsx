"use client";

import { buttonVariants } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";

interface NavProps {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    href: string;
  }[];
}

export function Nav({ links }: NavProps) {
  return (
    <div className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              buttonVariants({ variant: "ghost", size: "default" }),
              "justify-start",
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && <span className={cn("ml-auto")}>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
