import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../server/users/users.actions";

export default function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {},
  });
}
