"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon, User2Icon, UserPlus2Icon } from "lucide-react";
import LoadingSwap from "../utils/loading-swap";
import { useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export default function User() {
  const { data: session, isPending } = authClient.useSession();
  const isAuthed = session?.session.userId;
  const user = session?.user;

  if (isPending) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={isAuthed ? "https://github.com/pranathip.png" : undefined}
              alt={isAuthed ? `${user?.name} Profile Image` : "Profile Image"}
            />
            <AvatarFallback>
              {isAuthed ? user?.name.charAt(0).toUpperCase() : <User2Icon />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-50">
        {isAuthed ? <AuthedContent /> : <PublicContent />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const PublicContent = () => {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href={"/sign-in"} className="flex items-center gap-1">
            <LogInIcon /> Login to your account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/sign-up"} className="flex items-center gap-1">
            <UserPlus2Icon />
            Create account
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};

const AuthedContent = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            startTransition(async () => {
              try {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/");
                      toast.success("Signed out Successfully.");
                      router.refresh();
                    },
                    onError: (ctx) => {
                      toast.error(ctx.error.message);
                    },
                  },
                });
              } catch (error) {
                console.error(error);
              }
            });
          }}
        >
          <LoadingSwap isLoading={isPending}>
            <LogOutIcon /> Log out
          </LoadingSwap>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};
