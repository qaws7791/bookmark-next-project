"use client";
import useBookmarkReadMutation from "@/bookmarks/mutations/use-bookmark-read-mutation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface BookmarkReadButtonProps {
  bookmarkId: string;
  collectionId: string;
  readAt: Date | null;
  children?: React.ReactNode;
}

export default function BookmarkReadButton({
  bookmarkId,
  readAt,
  children,
  collectionId,
}: BookmarkReadButtonProps) {
  const mutation = useBookmarkReadMutation();
  const [pending, setPending] = useState(false);

  const handleReadStatusChange = () => {
    if (pending) return;
    setPending(true);
    mutation.mutate(
      {
        bookmarkId,
        readAt: readAt ? null : new Date().toISOString(),
        collectionId,
      },
      {
        onSuccess: () => {
          setPending(false);
        },
      },
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={readAt ? "secondary" : "default"}
            className="w-full"
            onClick={handleReadStatusChange}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {readAt ? "Mark as unread" : "Mark as read"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
