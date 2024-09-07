"use client";
import useCollections from "@/collections/queries/use-collections";
import { useSession } from "@/components/session-provider";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "../../lib/utils";

export default function CollectionList() {
  const { user } = useSession();
  const collectionQuery = useCollections({ userId: user.id });
  if (collectionQuery.isLoading || !collectionQuery.data) {
    return (
      <nav className="grid gap-1 px-2 mt-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </nav>
    );
  }

  return (
    <nav className="grid gap-1 px-2 mt-4">
      {collectionQuery.data.map((collection) => (
        <Link
          key={collection.id}
          href={`/app/collections/${collection.id}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "default" }),
            "justify-start",
          )}
        >
          <span
            className="w-4 h-4 rounded-full inline-block mr-2"
            style={{ backgroundColor: collection.color_code }}
          />
          <span>{collection.name}</span>
        </Link>
      ))}
    </nav>
  );
}
