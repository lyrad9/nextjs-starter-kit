import { auth } from "@/lib/auth-helper";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default async function AuthButton() {
  const user = await auth();
  if (!user) {
    return (
      <Link
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "lg",
          }),
          "text-muted-foreground rounded-sm px-1.5 py-0.5"
        )}
        href="/sign-in"
      >
        Se connecter
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-lg font-bold text-foreground">
            {user.name ?? user.username}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form>
            <Button
              formAction={async () => {
                "use server";
                await signOut();
                revalidatePath("/");
              }}
              type="submit"
              className=""
            >
              Se déconnecter
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
