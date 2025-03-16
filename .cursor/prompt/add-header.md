# Création d'un Header pour Next.js

## Instructions

Utilisez ce prompt pour créer un composant Header personnalisé pour votre application Next.js.

### Informations requises

Demander à l'utilisateur de saisir les informations requises pour créer le composant Header personnalisé pour votre application Next.js. Si rien n'est fourni demander le.

- **Nom du projet/site**: Comment s'appelle votre site ou application ?
- **Logo**: Souhaitez-vous inclure un logo ? Si oui, quel est le chemin de l'image ?
- **Navigation**: Quels liens de navigation doivent apparaître dans le header ?
- Sélecteur de thème (clair/sombre)
- Bouton de connexion/inscription
- Barre de recherche
- Autres

## Importations necessaires

```tsx
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/src/components/shared/Theme-mode-toggle";
import UserBtn from "../shared/UserBtn";
import LoginBtn from "@/src/features/user-auth/LoginBtn";
import MobileHeader from "./mobile-header";
import NavLinksMap from "../shared/NavLinksMap";
```

## Exemple de Composant Header

**An fixed header with a logo, navigation links, and a theme toggle button**.

```tsx
"use client";
export default function Header() {
  return (
    <header className="fixed inset-x-0 z-50 flex h-auto w-screen shadow backdrop-blur-md">
      <div className="px-8 w-full m-auto h-20 flex items-center max-w-5xl">
        <div className="flex items-center gap-2">
          <Link
            className="text-lg leading-[24px] font-caption tracking-widest mt-1"
            href="/"
          >
            App Name
          </Link>
        </div>

        <div className="flex-1" />

        {/*
        this block contains the login and theme toggle button and userBtn*/}
        <div>
          <div className="flex gap-2 items-center max-lg:hidden">
            <LoginBtn />
            <ModeToggle />
            <UserBtn />
          </div>
          <div className="lg:hidden">
            {/* A header for mobile devices */}
            <MobileHeader />
          </div>
        </div>
      </div>
    </header>
  );
}
```

A header

```tsx
"use client";
export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex items-center gap-2">
        <Image src={logoPath} alt={`${siteName} logo`} width={32} height={32} />

        <Link
          className="text-lg leading-[24px] font-caption tracking-widest mt-1"
          href="/"
        >
          App Name
        </Link>
      </div>

      <div>
        <div className="flex gap-2 items-center max-lg:hidden">
          <LoginBtn />
          <UserBtn />
          <ModeToggle />
        </div>

        <div className="lg:hidden">
          {/* A header for mobile devices */}
          <MobileHeader />
        </div>
      </div>
    </header>
  );
}
```

## Liens de navigation

```tsx
{
  navLinks.length > 0 && (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        {navLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

## Comment l'utiliser

Placez ce composant dans votre dossier `src/components/layout/`
