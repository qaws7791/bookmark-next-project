"use client";
import { useSession } from "@/components/session-provider";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogoutMutation from "@/users/mutations/use-logout.mutation";
import useProfile from "@/users/queries/use-profile";

export function UserNav() {
  const session = useSession();
  const profileQuery = useProfile({ userId: session.user.id });
  const logoutMutation = useLogoutMutation();

  if (!profileQuery.data || profileQuery.isLoading || profileQuery.isError) {
    return (
      <Avatar className="h-10 w-10">
        <AvatarImage src="/avatars/1.jpg" alt="Not logged in" />
      </Avatar>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={profileQuery.data.avatar_url || "/blank-profile.webp"}
              alt={profileQuery.data.full_name || "No Name"}
            />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profileQuery.data.full_name || "No Name"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            className="w-full"
            onClick={() => {
              logoutMutation.mutate();
            }}
          >
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
