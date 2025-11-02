'use client';

import { useEffect, useState } from 'react';

/**
 * ScrollProgress - Barra de progresso de scroll no topo da página
 *
 * Mostra visualmente o quanto do conteúdo foi scrollado (0-100%)
 * Melhora UX em páginas longas, aumenta engajamento e scroll depth
 *
 * Design: Gradient ouro elegante com glow sutil
 * Performance: Throttled scroll listener para evitar cálculos excessivos
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Evita divisão por zero em páginas muito curtas
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Inicializa o progresso
    updateProgress();

    // Listener otimizado com requestAnimationFrame
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[100] pointer-events-none"
      role="progressbar"
      aria-label="Progresso de leitura da página"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      suppressHydrationWarning
    >
      <div
        className="h-full bg-gradient-to-r from-ouro via-ouro to-[#D4A855] shadow-[0_0_8px_rgba(199,154,52,0.6)] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
        suppressHydrationWarning
      />
    </div>
  );
}
