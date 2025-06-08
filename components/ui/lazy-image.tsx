'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fallbackSrc?: string;
  onError?: () => void;
}

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

function useLazyLoad(threshold = 0.1) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, shouldLoad };
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  sizes,
  priority = false,
  placeholder = "blur",
  blurDataURL,
  fallbackSrc,
  onError
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AoU6kEKEIEpSlKUoiIiJ6FKeKvL/Z";
  
  // Lista de fallbacks em ordem de prioridade
  const fallbackImages = [
    fallbackSrc,
    '/assets/images/jewelry-workshop-hero.jpg',
    '/assets/images/home-hero.jpg',
    '/assets/images/home-services.jpg'
  ].filter(Boolean);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!hasError && fallbackImages.length > 0) {
      const nextFallback = fallbackImages.shift();
      if (nextFallback && nextFallback !== currentSrc) {
        setCurrentSrc(nextFallback);
        return;
      }
    }
    
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const imageProps = {
    src: currentSrc,
    alt,
    className: `transition-all duration-500 ${
      isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
    } ${hasError ? 'opacity-50' : ''} ${className}`,
    onLoad: handleLoad,
    onError: handleError,
    sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority,
    placeholder: placeholder as any,
    blurDataURL: blurDataURL || defaultBlurDataURL,
    ...(fill ? {} : { width, height })
  };

  if (hasError && fallbackImages.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-esmeralda/5 to-ouro/5 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-esmeralda to-ouro rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-marfim" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs text-grafite-light">Imagem indisponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-esmeralda/5 via-esmeralda/10 to-esmeralda/5 animate-pulse rounded-lg z-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {fill ? (
        <Image fill {...imageProps} />
      ) : (
        <Image {...imageProps} />
      )}
    </div>
  );
}

export function LazySection({ children, className = "", threshold = 0.1 }: LazySectionProps) {
  const { ref, shouldLoad } = useLazyLoad(threshold);

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? children : (
        <div className="h-96 bg-gradient-to-r from-esmeralda/5 via-esmeralda/10 to-esmeralda/5 animate-pulse rounded-2xl" />
      )}
    </div>
  );
}