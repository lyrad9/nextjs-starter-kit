import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Consultez votre boîte mail</CardTitle>
          <CardDescription className="mt-2">
            Un lien de connexion a été envoyé à votre adresse mail
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
