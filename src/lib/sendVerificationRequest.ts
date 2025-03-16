import { resend } from "./resend";
import MagicLinkEmail from "../../emails/MagicLink";

interface VerificationRequestParams {
  identifier: string;
  url: string;
  provider: {
    from: string;
  };
}

export async function sendVerificationRequest(params: any) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);

  try {
    const data = await resend.emails.send({
      from: provider.from,
      to: [identifier],
      subject: `Connexion à ${host}`,
      react: MagicLinkEmail({ url, host }),
      text: text({ url, host }),
    });

    return { success: true, data };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error("Échec de l'envoi de l'email de vérification");
  }
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Connexion à ${host}\n${url}\n\n`;
}
