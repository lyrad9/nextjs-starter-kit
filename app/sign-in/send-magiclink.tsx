"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
export default function SendMagicLink() {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          try {
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            await signIn("resend", {
              email,
              redirectTo: "/",
            });
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`/error?error=${error.type})`);
            }
            throw error;
          }
        });
      }}
      className="space-y-3"
    >
      <Label htmlFor="email">Votre adresse email</Label>
      <div className="flex items-center gap-2">
        <Input
          className="flex-2 rounded-md border bg-background px-3 py-2"
          type="email"
          name="email"
          placeholder="Adresse email"
          required
        />
        <Button className="flex-1" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            "Login with email"
          )}
        </Button>
      </div>
    </form>
  );
}
