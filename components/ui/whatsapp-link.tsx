'use client';

import React from 'react';

interface WhatsAppLinkProps {
  message?: string;
  children: React.ReactNode;
  className?: string;
  fallbackHref?: string;
}

export function WhatsAppLink({
  message = 'Olá! Gostaria de saber mais sobre os serviços da Cícero Joias.',
  children,
  className,
  fallbackHref = '#'
}: WhatsAppLinkProps) {
  // Número WhatsApp fixo da empresa
  const whatsappNumber = '5583988073784';

  const getWhatsAppLink = () => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
} 