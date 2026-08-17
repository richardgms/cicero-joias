import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-action-strong hover:bg-action-strong/90',
          }
        }}
        fallbackRedirectUrl="/"
        localization={{
          socialButtonsBlockButton: "Continuar com {{provider}}",
          dividerText: "ou",
          formFieldLabel__emailAddress: "E-mail",
          formFieldLabel__password: "Senha",
          formButtonPrimary: "Entrar",
          footerActionLink: "Criar conta",
          footerActionText: "Não tem uma conta?",
          formFieldAction__forgotPassword: "Esqueci minha senha"
        }}
      />
    </div>
  );
}
