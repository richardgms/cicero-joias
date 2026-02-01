'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';



interface LoadingScreenProps {
    /**
     * Optional message to display below the loader
     */
    message?: string;
    /**
     * Variant of the loader:
     * - 'fullscreen': Covers the entire screen (fixed). Used for page transitions.
     * - 'inline': Takes up 100% of the parent container height/width. Used for content loading.
     * @default 'inline'
     */
    variant?: 'fullscreen' | 'inline';
    /**
     * Optional additional className
     */
    className?: string;
}

export function LoadingScreen({
    message = 'Carregando...',
    variant = 'inline',
    className
}: LoadingScreenProps) {

    // Container styling based on variant
    const containerClasses = cn(
        "flex flex-col items-center justify-center gap-6",
        variant === 'fullscreen'
            ? "!fixed !inset-0 !w-[100vw] !h-[100vh] !bg-[#F8F5F0] !z-[9999] text-text-primary"
            : "w-full min-h-[300px] h-full bg-transparent text-text-primary",
        className
    );

    // Dynamic sizes based on variant
    const sizeClasses = variant === 'fullscreen' ? "w-32 h-32" : "w-16 h-16";
    const ring2Inset = variant === 'fullscreen' ? "inset-4" : "inset-2";
    const ring3Inset = variant === 'fullscreen' ? "inset-6" : "inset-3";
    const iconSize = variant === 'fullscreen' ? "w-12 h-12" : "w-6 h-6";

    return (
        <div className={containerClasses}>
            {/* Brand Icon / Animation Wrapper - Explicitly sized to ensure perfect centering */}
            <div className={cn("relative flex items-center justify-center", sizeClasses)}>

                {/* Outer Ring - Pulse */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.5, 0.2],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full border border-ouro/20 w-full h-full"
                />

                {/* Middle Ring - Counter Rotation */}
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [0.9, 1, 0.9]
                    }}
                    transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={cn(
                        "absolute rounded-full border border-ouro/40",
                        ring2Inset
                    )}
                    style={{
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderLeftColor: 'transparent'
                    }}
                />

                {/* Inner Glow - Breathing */}
                <motion.div
                    animate={{
                        opacity: [0, 0.3, 0],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={cn(
                        "absolute rounded-full bg-ouro/10 blur-xl",
                        ring3Inset
                    )}
                />

                {/* Center Icon - Shine SVG */}
                <motion.div
                    animate={{
                        scale: [0.95, 1.05, 0.95],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={cn("relative z-10 flex items-center justify-center", iconSize)}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/logos/shine.svg"
                        alt="Loading..."
                        className="w-full h-full object-contain opacity-90"
                    />
                </motion.div>
            </div>

            {/* Message */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={cn(
                        "font-jost font-medium uppercase tracking-[0.25em] text-center px-4",
                        variant === 'fullscreen' ? "text-sm text-ouro" : "text-[10px] text-text-secondary/60"
                    )}
                >
                    {message}
                </motion.div>
            )}
        </div>
    );
}
