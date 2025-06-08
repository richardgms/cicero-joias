'use client';

import React, { useState, useEffect } from 'react';

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
  const [whatsappNumber, setWhatsappNumber] = useState('5583988073784');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWhatsApp() {
      try {
        const response = await fetch('/api/admin/site-config');
        if (response.ok) {
          const data = await response.json();
          if (data.companyWhatsapp) {
            setWhatsappNumber(data.companyWhatsapp);
          }
        }
      } catch (error) {
        console.warn('Erro ao carregar WhatsApp, usando padrão:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWhatsApp();
  }, []);

  const getWhatsAppLink = () => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  if (isLoading) {
    return (
      <a href={fallbackHref} className={className}>
        {children}
      </a>
    );
  }

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