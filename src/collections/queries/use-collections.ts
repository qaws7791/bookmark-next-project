import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "../../../server/collections/collections.actions";

export default function useCollections({ userId }: { userId: string }) {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => {
      return fetchCollections(userId);
    },
  });
}
