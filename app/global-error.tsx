'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <h2 className="text-xl font-bold">Algo deu muito errado!</h2>
          <button
            className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
            onClick={() => reset()}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}