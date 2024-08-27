import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark } from "../../../server/bookmarks/bookmarks.actions";

export default function useBookmarkAddMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
  });
}
