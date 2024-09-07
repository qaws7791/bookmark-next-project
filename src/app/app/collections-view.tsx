"use client";
import CollectionCard from "@/collections/components/collection-card";
import useCollections from "@/collections/queries/use-collections";
import { useSession } from "@/components/session-provider";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function CollectionsView() {
  const session = useSession();
  const collectionQuery = useCollections({ userId: session.user.id });

  if (collectionQuery.isLoading || !collectionQuery.data) {
    return (
      <div className="flex flex-wrap gap-8">
        <Skeleton className="w-80 h-48" />
        <Skeleton className="w-80 h-48" />
        <Skeleton className="w-80 h-48" />
        <Skeleton className="w-80 h-48" />
        <Skeleton className="w-80 h-48" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8">
      {collectionQuery.data.map((collection) => (
        <Link
          key={collection.id}
          href={`/app/collections/${collection.id}`}
          className="flex-shrink-0"
        >
          <CollectionCard collection={collection} />
        </Link>
      ))}
    </div>
  );
}
