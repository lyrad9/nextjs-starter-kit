import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { providerMap, signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { redirect } from "next/navigation";
export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const callbackUrl = (await props.searchParams).callbackUrl;
  return (
    <DialogContent>
      <DialogHeader className="text-center">
        <DialogTitle className="text-3xl font-bold">Se connecter</DialogTitle>
        <DialogDescription>
          Si vous n&apos;avez pas de compte, cela se créera automatiquement.
        </DialogDescription>
      </DialogHeader>

      <form
        // action={}
        className="space-y-3"
      >
        <Label htmlFor="email">Adresse email</Label>
        <div className="flex items-center gap-2">
          <Input
            className="flex-2 rounded-md border bg-background px-3 py-2"
            type="email"
            name="email"
            placeholder="Adresse email"
            required
          />
          <Button
            formAction={async (formData) => {
              "use server";
              try {
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
            }}
            className="flex-1"
            type="submit"
          >
            Continuer avec Email
          </Button>
        </div>
      </form>
      <div className="flex flex-col-2 gap-2">
        {Object.values(providerMap).map((provider) => (
          <form key={provider.id}>
            <Button
              formAction={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    //  redirectTo: "/",
                    redirectTo: callbackUrl ?? "",
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/error?error=${error.type})`);
                  }
                  throw error;
                }
              }}
              className="w-full"
              type="submit"
            >
              Continuer avec {provider.id}
            </Button>
          </form>
        ))}
      </div>
    </DialogContent>
  );
}
