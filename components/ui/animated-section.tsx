'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: boolean;
}

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.8,
  direction = 'up',
  stagger = false 
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50 };
      case 'down': return { y: -50 };
      case 'left': return { x: -50 };
      case 'right': return { x: 50 };
      default: return { y: 50 };
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      ...getInitialPosition()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
        ...(stagger && {
          staggerChildren: 0.2,
        }),
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      ...getInitialPosition()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration * 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={stagger ? containerVariants : undefined}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...(!stagger && {
        variants: containerVariants,
      })}
    >
      {stagger ? (
        React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
}

// Hook personalizado para animações de contador
export function useAnimatedCounter(end: number, duration: number = 2.5) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return { ref, shouldAnimate: inView, end, duration };
}

// Componente para partículas douradas (SSR-safe)
export function GoldenParticles({ count = 15 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: number}>>([]);

  useEffect(() => {
    setMounted(true);
    // Gerar posições das partículas apenas no cliente
    const newParticles = [...Array(count)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, [count]);

  if (!mounted) {
    return null; // Não renderizar nada no servidor
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-ouro rounded-full opacity-30"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Componente para efeito glassmorphism
export function GlassCard({ 
  children, 
  className = "",
  hover = true 
}: { 
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const baseClasses = "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl";
  
  if (hover) {
    return (
      <motion.div
        className={`${baseClasses} ${className}`}
        whileHover={{ 
          scale: 1.02,
          borderColor: "rgba(207, 154, 36, 0.4)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
} 