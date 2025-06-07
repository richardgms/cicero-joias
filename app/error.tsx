'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Algo deu errado!</h2>
      <button
        className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
        onClick={() => reset()}
      >
        Tentar novamente
      </button>
    </div>
  );
}