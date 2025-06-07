'use client';

import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';

export function HeaderAuth() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex items-center space-x-4">
      {isSignedIn ? (
        <>
          <span className="text-sm hidden md:inline">
            Olá, {user.firstName || 'Cliente'}
          </span>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
              }
            }}
            localization={{
              userButton: {
                action__signOut: "Sair",
                action__manageAccount: "Gerenciar conta",
                action__switchAccount: "Trocar conta",
                action__addAccount: "Adicionar conta"
              }
            }}
          />
        </>
      ) : (
        <>
          <Link href="/sign-in">
            <span className="text-sm hover:text-primary transition-colors">
              Entrar
            </span>
          </Link>
          <Link href="/sign-up">
            <span className="text-sm hover:text-primary transition-colors">
              Cadastrar
            </span>
          </Link>
        </>
      )}
    </div>
  );
} 