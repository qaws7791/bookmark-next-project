"use client";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import SiteConfig from "@/config/site-config";
import * as Dialog from "@radix-ui/react-dialog";
import { HomeIcon, MenuIcon, X } from "lucide-react";

export default function MobileSidebar() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80" />
        <Dialog.Content
          className="fixed inset-0 bg-background backdrop-blur-sm z-50 data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left
        "
        >
          <div className="flex items-center justify-between p-4 gap-4">
            <Dialog.Title asChild>
              <p className="font-bold">{SiteConfig.siteName}</p>
            </Dialog.Title>
            <Dialog.Close className="">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Close</span>
                <X />
              </Button>
            </Dialog.Close>
          </div>
          <Nav
            links={[
              {
                title: "Home",
                icon: HomeIcon,
                href: "/app",
              },
            ]}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
