'use client';

import { useEffect, useState } from 'react';

export function EnvChecker() {
  const [envVars, setEnvVars] = useState({
    publishableKey: '',
    signInUrl: '',
    signUpUrl: '',
    afterSignInUrl: '',
    afterSignUpUrl: '',
  });

  useEffect(() => {
    setEnvVars({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'não definido',
      signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'não definido',
      signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || 'não definido',
      afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || 'não definido',
      afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || 'não definido',
    });
  }, []);

  return (
    <div className="p-4 m-4 border border-gray-300 rounded-md bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Verificação de Variáveis de Ambiente</h2>
      <div className="space-y-2">
        <div>
          <span className="font-semibold">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: </span>
          <span>{envVars.publishableKey.substring(0, 10)}...</span>
        </div>
        <div>
          <span className="font-semibold">NEXT_PUBLIC_CLERK_SIGN_IN_URL: </span>
          <span>{envVars.signInUrl}</span>
        </div>
        <div>
          <span className="font-semibold">NEXT_PUBLIC_CLERK_SIGN_UP_URL: </span>
          <span>{envVars.signUpUrl}</span>
        </div>
        <div>
          <span className="font-semibold">NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: </span>
          <span>{envVars.afterSignInUrl}</span>
        </div>
        <div>
          <span className="font-semibold">NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: </span>
          <span>{envVars.afterSignUpUrl}</span>
        </div>
      </div>
    </div>
  );
} 