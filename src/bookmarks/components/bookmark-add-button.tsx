import BookmarkAddForm from "@/bookmarks/components/bookmark-add-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";

interface BookmarkAddButtonProps {
  collectionId: string;
}

export default function BookmarkAddButton({
  collectionId,
}: BookmarkAddButtonProps) {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Add to bookmark</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogTitle className="sr-only">Add to bookmark</DialogTitle>
        <BookmarkAddForm collectionId={collectionId} />
      </DialogContent>
    </Dialog>
  );
}
