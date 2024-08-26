import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollection } from "../../../server/collections/collections.actions";

export default function useCreateCollectionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },
  });
}
