import MobileSidebar from "@/app/app/mobile-sidebar";
import { UserNav } from "@/app/app/user-nav";
import { ModeToggle } from "@/components/theme-control-button";
import SiteConfig from "@/config/site-config";
import Link from "next/link";

export default function AppHeader() {
  return (
    <div className="flex items-center justify-between py-3 px-4 sticky top-0 z-50 backdrop-blur border-b border-border h-16">
      <div className="flex gap-4 items-center">
        <div className="md:hidden">
          <MobileSidebar />
        </div>

        <Link href="/app">
          <p className="font-bold">{SiteConfig.siteName}</p>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  );
}
