import BookmarkReadButton from "@/bookmarks/components/bookmark-read-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getGoogleFaviconUrl, getStorageFullUrl } from "@/lib/utils";
import { Circle, CircleCheck, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { BookmarkRow } from "../../../supabase/supabase";
import { formatRelativeLocalDate } from "../../lib/date";

interface BookmarkCardProps {
  bookmark: BookmarkRow;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const imageUrl = bookmark.image_url
    ? getStorageFullUrl(bookmark.image_url)
    : "/default-bookmark.webp";

  const faviconUrl = bookmark.favicon_url
    ? getStorageFullUrl(bookmark.favicon_url)
    : getGoogleFaviconUrl(new URL(bookmark.site_url).hostname);

  const readText = bookmark.read_at
    ? `Read ${formatRelativeLocalDate(new Date(bookmark.read_at))}`
    : `Added ${formatRelativeLocalDate(new Date(bookmark.created_at))}`;

  return (
    <Card className="overflow-hidden max-w-80">
      <CardContent className="p-0">
        <a
          key={bookmark.id}
          href={bookmark.site_url}
          rel="noreferrer noopener"
          target="_blank"
          className="max-w-80 hover:bg-accent hover:text-accent-foreground "
        >
          <Image
            src={imageUrl}
            alt={bookmark.title}
            className="w-full h-44 object-cover"
            width={320}
            height={176}
          />
        </a>
        <div className="flex py-3 px-2 items-center gap-4">
          <Image
            src={faviconUrl}
            width={32}
            height={32}
            alt={bookmark.title}
            className="w-8 h-8 object-cover rounded-full shrink-0"
          />

          <a href={bookmark.site_url} target="_blank" rel="noreferrer noopener">
            <h3 className="text-lg font-medium leading-tight line-clamp-2">
              {bookmark.title}
            </h3>
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 ml-auto">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <button className="w-full">Delete</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-2">
            {bookmark.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <BookmarkReadButton
          bookmarkId={bookmark.id}
          readAt={bookmark.read_at ? new Date(bookmark.read_at) : null}
          collectionId={bookmark.collection_id}
        >
          {bookmark.read_at ? (
            <CircleCheck className="mr-2 h-4 w-4" />
          ) : (
            <Circle className="mr-2 h-4 w-4" />
          )}
          {readText}
        </BookmarkReadButton>
      </CardFooter>
    </Card>
  );
}
