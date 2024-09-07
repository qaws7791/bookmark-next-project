"use client";
import { Nav } from "@/components/nav";
import { HomeIcon } from "lucide-react";

export default function AppSidebar() {
  return (
    <Nav
      links={[
        {
          title: "Home",
          icon: HomeIcon,
          href: "/app",
        },
      ]}
    />
  );
}
