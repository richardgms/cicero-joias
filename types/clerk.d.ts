declare module '@clerk/nextjs' {
  import { ComponentType, ReactNode } from 'react';
  
  export const ClerkProvider: ComponentType<{
    children: ReactNode;
    [key: string]: any;
  }>;
  
  // Componentes de autenticação
  export const SignIn: ComponentType<any>;
  export const SignUp: ComponentType<any>;
  export const SignInButton: ComponentType<any>;
  export const SignUpButton: ComponentType<any>;
  export const UserButton: ComponentType<any>;
  
  // Hooks
  export function useUser(): {
    isSignedIn: boolean;
    user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      emailAddresses: any[];
      [key: string]: any;
    };
    [key: string]: any;
  };
  
  // Função do servidor (para dashboard/page.tsx)
  export function currentUser(): Promise<{
    id: string;
    firstName: string | null;
    lastName: string | null;
    emailAddresses: any[];
    [key: string]: any;
  } | null>;
} 