import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../../server/users/users.actions";

export default function useProfile({ userId }: { userId: string }) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(userId),
  });
}
