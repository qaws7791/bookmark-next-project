import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollectionsRow } from "../../../supabase/supabase";

interface CollectionCardProps {
  collection: CollectionsRow;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Card className="h-48 w-80 flex flex-col justify-between hover:bg-accent hover:text-accent-foreground">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: collection.color_code }}
          />
          <CardTitle>{collection.name}</CardTitle>
        </div>
        <CardDescription className="h-full line-clamp-2">
          {collection.description}
        </CardDescription>
      </CardHeader>
      {/* <CardFooter>
        <p className="text-right w-full">{collection.totalItems} bookmarks</p>
      </CardFooter> */}
    </Card>
  );
}
