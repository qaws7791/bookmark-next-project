import BookmarkAddForm from "@/bookmarks/components/bookmark-add-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface BookmarkAddButtonProps {
  collectionId: string;
}

export default function BookmarkAddButton({
  collectionId,
}: BookmarkAddButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 w-4 h-4" />
          Add bookmark
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Add to bookmark</DialogTitle>
        <BookmarkAddForm collectionId={collectionId} />
      </DialogContent>
    </Dialog>
  );
}
