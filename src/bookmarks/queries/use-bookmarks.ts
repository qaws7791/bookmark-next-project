import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBookmarks } from "../../../server/bookmarks/bookmarks.actions";

export default function useBookmarks({
  collectionId,
  page,
  pageSize,
}: {
  collectionId: string;
  page: number;
  pageSize: number;
}) {
  return useInfiniteQuery({
    queryKey: ["bookmarks", collectionId],
    queryFn: ({ pageParam }) => {
      return fetchBookmarks({
        collectionId,
        page: pageParam,
        pageSize,
      });
    },
    initialPageParam: page,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < pageSize) {
        return;
      }
      return pages.length + 1;
    },
  });
}
