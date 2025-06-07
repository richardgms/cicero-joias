'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from '@/lib/query-provider';

const ptBRLocalization = {
  socialButtonsBlockButton: "Continuar com {{provider}}",
  dividerText: "ou",
  signIn: {
    start: {
      title: "Entrar",
      subtitle: "para continuar em Cícero Joias",
      actionText: "Não tem uma conta?",
      actionLink: "Cadastre-se",
    },
    password: {
      title: "Entrar com senha",
      subtitle: "Digite sua senha para continuar",
      actionLink: "Voltar",
      formTitle: "Senha",
      formSubtitle: "",
      resetLink: "Esqueci minha senha",
      backButton: "Voltar",
      submitButton: "Entrar",
    },
    forgotPasswordAlternativeMethods: {
      title: "Esqueceu sua senha?",
      subtitle: "Escolha uma das opções abaixo para continuar",
      actionLink: "Voltar para o login",
    },
    resetPassword: {
      title: "Redefinir senha",
      subtitle: "Um link será enviado para o seu e-mail",
      formTitle: "E-mail",
      formSubtitle: "",
      submitButton: "Enviar link",
      backButton: "Voltar para o login",
    },
    emailCode: {
      title: "Verifique seu e-mail",
      subtitle: "Um código foi enviado para {{identifier}}",
      formTitle: "Código de verificação",
      formSubtitle: "Digite o código enviado para seu e-mail",
      resendButton: "Reenviar código",
      submitButton: "Verificar",
      backButton: "Voltar",
    },
    emailLinkAuth: {
      title: "Verifique seu e-mail",
      subtitle: "Um link foi enviado para {{identifier}}",
      formTitle: "Não recebeu o link?",
      formSubtitle: "Clique para enviar novamente",
      resendButton: "Reenviar link",
      backButton: "Voltar",
    },
  },
  signUp: {
    start: {
      title: "Criar conta",
      subtitle: "para continuar em Cícero Joias",
      actionText: "Já tem uma conta?",
      actionLink: "Entrar",
    },
    passwordSetup: {
      title: "Configure sua senha",
      subtitle: "",
      formTitle: "Senha",
      formSubtitle: "Mínimo 8 caracteres",
      submitButton: "Continuar",
    },
    emailVerification: {
      title: "Verificar seu e-mail",
      subtitle: "Um código foi enviado para {{identifier}}",
      formTitle: "Código de verificação",
      formSubtitle: "Digite o código enviado para seu e-mail",
      resendButton: "Reenviar código",
      submitButton: "Verificar e-mail",
    },
    verifications: {
      title: "Verificação",
      subtitle: "Para verificar sua identidade, enviamos um código para seu e-mail",
      emailCode: {
        title: "Verificar e-mail",
        subtitle: "Enviamos um código para {{identifier}}",
        formTitle: "Código de verificação",
        formSubtitle: "Digite o código recebido por e-mail",
        resendButton: "Reenviar código",
      },
    },
  },
  userButton: {
    action__signOut: "Sair",
    action__manageAccount: "Gerenciar conta",
    action__addAccount: "Adicionar conta",
  },
  userProfile: {
    navbar: {
      title: "Perfil",
      personalInfo: "Informações pessoais",
    },
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBRLocalization}>
      <QueryProvider>{children}</QueryProvider>
    </ClerkProvider>
  );
} 