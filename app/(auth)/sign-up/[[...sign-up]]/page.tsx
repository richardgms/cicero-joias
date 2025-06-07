import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-amber-600 hover:bg-amber-700',
          }
        }}
        localization={{
          socialButtonsBlockButton: "Continuar com {{provider}}",
          dividerText: "ou",
          formFieldLabel__emailAddress: "E-mail",
          formFieldLabel__username: "Nome de usuário",
          formFieldLabel__password: "Senha",
          formFieldLabel__firstName: "Nome",
          formFieldLabel__lastName: "Sobrenome",
          formButtonPrimary: "Cadastrar",
          footerActionLink: "Entrar",
          footerActionText: "Já tem uma conta?",
        }}
      />
    </div>
  );
}
