import { Button } from "@/components/ui/button";
import { providerMap, signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Section from "@/components/layout/Section";
import { redirect } from "next/navigation";
import SendMagicLink from "./send-magiclink";
export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const callbackUrl = (await props.searchParams).callbackUrl;
  return (
    <Section className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md space-y-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Se connecter</CardTitle>
          <CardDescription>
            Si vous n&apos;avez pas de compte, cela se créera automatiquement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SendMagicLink />
          {/*  <form
            //action={}
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
          </form> */}
          <div className="flex flex-col-2 gap-2">
            {Object.values(providerMap).map((provider) => (
              <form
                key={provider.id}
                //action={}
              >
                <Button
                  formAction={async () => {
                    "use server";
                    try {
                      await signIn(provider.id, {
                        //redirectTo: "/",
                        redirectTo: callbackUrl ?? "",
                      });
                    } catch (error) {
                      if (error instanceof AuthError) {
                        return redirect(`$/error?error=${error.type})`);
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
        </CardContent>
      </Card>
    </Section>
  );
}
