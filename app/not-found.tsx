import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Página não encontrada</h2>
      <p className="text-muted-foreground">Não foi possível encontrar a página que você está procurando.</p>
      <Link 
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
      >
        Voltar ao início
      </Link>
    </div>
  );
}