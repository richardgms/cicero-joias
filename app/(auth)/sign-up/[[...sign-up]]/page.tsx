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
      />
    </div>
  );
}
