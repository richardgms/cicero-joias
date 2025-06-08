'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
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
  blurDataURL
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AoU6kEKEIEpSlKUoiIiJ6FKeKvL/Z";

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Fallback image se houver erro
  const fallbackSrc = hasError ? '/assets/images/home-hero.jpg' : src;

  const imageProps = {
    src: fallbackSrc,
    alt,
    className: `transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    onLoad: handleLoad,
    onError: handleError,
    sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority,
    placeholder: placeholder as any,
    blurDataURL: blurDataURL || defaultBlurDataURL,
    ...(fill ? {} : { width, height })
  };

  return (
    <div className="relative overflow-hidden">
      {/* Loading skeleton */}
      {isLoading && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-esmeralda/10 via-esmeralda/20 to-esmeralda/10 ${fill ? 'w-full h-full' : ''}`}
          style={!fill ? { width, height } : {}}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className={`absolute inset-0 bg-esmeralda/5 flex items-center justify-center ${fill ? 'w-full h-full' : ''}`}
             style={!fill ? { width, height } : {}}>
          <div className="text-center text-esmeralda/60">
            <div className="text-2xl mb-2">🖼️</div>
            <p className="text-xs">Imagem não disponível</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {fill ? (
        <Image
          {...imageProps}
          fill
        />
      ) : (
        <Image
          {...imageProps}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

// Hook para lazy loading com intersection observer
export function useLazyLoad(threshold = 0.1) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });

  return { ref, shouldLoad: inView };
}

// Componente para seções lazy
interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
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