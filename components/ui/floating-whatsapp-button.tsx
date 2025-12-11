'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsappIcon } from '@/components/icons';

/**
 * FloatingWhatsAppButton - Botão flutuante do WhatsApp no canto inferior direito
 *
 * Aparece após o usuário scrollar 30% da página, incentivando conversão
 * Design: Verde WhatsApp com pulso sutil e animações suaves
 * Performance: Throttled scroll listener otimizado
 *
 * @param threshold - Porcentagem de scroll para aparecer (default: 30)
 * @param whatsappLink - Link do WhatsApp (default: whatsappLinks.primary)
 */

interface FloatingWhatsAppButtonProps {
  threshold?: number;
  whatsappLink?: string;
}

export function FloatingWhatsAppButton({
  threshold = 30,
  whatsappLink = 'https://wa.me/558399146963?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Cícero%20Joias.'
}: FloatingWhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setIsVisible(scrollPercent > threshold);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScrollProgress);
        ticking = true;
      }
    };

    // Verifica inicialmente
    checkScrollProgress();

    // Listener otimizado
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollProgress);
    };
  }, [threshold]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[90] md:bottom-8 md:right-8"
          suppressHydrationWarning
        >
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/40 md:h-16 md:w-16"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Conversar no WhatsApp"
          >
            {/* Pulso de atenção - Mais lento (3s) */}
            <span className="absolute inset-0 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-[#25D366] opacity-20" />

            {/* Ícone do WhatsApp */}
            <WhatsappIcon className="relative z-10 h-7 w-7 text-white md:h-8 md:w-8" />

            {/* Tooltip no hover (desktop) */}
            <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg bg-grafite px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:block">
              Conversar no WhatsApp
              <span className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-grafite" />
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
