import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateBookmarkReadStatus } from "../../../server/bookmarks/bookmarks.actions";
import { BookmarkRow } from "../../../supabase/supabase";

export default function useBookmarkReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookmarkId,
      readAt,
    }: {
      bookmarkId: string;
      readAt: string | null;
      collectionId: string;
    }) => {
      return updateBookmarkReadStatus({ bookmarkId, readAt });
    },

    onMutate: ({ bookmarkId, readAt, collectionId }) => {
      const previousBookmarks = queryClient.getQueryData<
        InfiniteData<BookmarkRow[]>
      >(["bookmarks", collectionId]);

      if (!previousBookmarks) return;

      const newBookmarks = previousBookmarks.pages.map((page) => {
        return page.map((bookmark) => {
          if (bookmark.id === bookmarkId) {
            return {
              ...bookmark,
              read_at: readAt,
            };
          }

          return bookmark;
        });
      });

      queryClient.setQueryData<InfiniteData<BookmarkRow[]> | undefined>(
        ["bookmarks", collectionId],
        (data) => {
          if (!data) return;
          return {
            ...data,
            pages: newBookmarks,
          };
        },
      );

      return { previousBookmarks };
    },

    onError: (error, { collectionId }, context) => {
      // rollback
      if (!context) return;
      queryClient.setQueryData<InfiniteData<BookmarkRow[]> | undefined>(
        ["bookmarks", collectionId],
        (data) => {
          if (!data) return;
          return {
            ...data,
            pages: context.previousBookmarks.pages,
          };
        },
      );
      console.error(error);
    },
  });
}
