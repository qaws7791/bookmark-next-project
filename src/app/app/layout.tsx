import AppHeader from "@/app/app/app-header";
import Sidebar from "@/app/app/app-sidebar";
import CollectionList from "@/app/app/collection-list";
import CollectionAddButton from "@/collections/components/collection-add-button";
import { createClient } from "../../../supabase/server";

import SessionProvider from "@/components/session-provider";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <SessionProvider>
      <div className="min-h-screen h-full flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <div className="w-64 border-border border-r hidden md:block flex-shrink-0 max-h-[calc(100vh - 16rem)] sticky top-16">
            <Sidebar />
            <div className="flex px-4 mt-24 items-center gap-4 justify-between">
              <p className="font-semibold ">Collections</p>
              <CollectionAddButton />
            </div>
            <CollectionList />
          </div>
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
