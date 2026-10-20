import { Toaster } from 'sonner';

// Avisos do sonner ("Link copiado...") usados no detalhe; montado só aqui para
// não carregar o sonner nas demais páginas públicas.
export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors position="top-center" />
    </>
  );
}
