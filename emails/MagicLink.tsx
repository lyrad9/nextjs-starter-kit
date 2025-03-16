interface MagicLinkEmailProps {
  url: string;
  host: string;
}

export default function MagicLinkEmail({ url, host }: MagicLinkEmailProps) {
  return (
    <div>
      <h1>Connexion à {host}</h1>
      <p>Cliquez sur le lien ci-dessous pour vous connecter:</p>
      <a href={url}>Se connecter</a>
    </div>
  );
}
