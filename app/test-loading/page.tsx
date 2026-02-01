'use client';

import React, { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Assuming this exists, based on previous file reads

export default function TestLoadingPage() {
    const [isFullscreenLoading, setIsFullscreenLoading] = useState(false);

    const triggerFullscreen = () => {
        setIsFullscreenLoading(true);
        setTimeout(() => {
            setIsFullscreenLoading(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-bg-page p-8 font-sans text-text-primary">
            <h1 className="text-3xl font-serif mb-8 text-ouro-gold">Loading UI Test Framework</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Section 1: Fullscreen Test */}
                <section className="bg-surface-card p-6 rounded-lg border border-border-default shadow-sm">
                    <h2 className="text-xl font-medium mb-4">Fullscreen Loader</h2>
                    <p className="text-text-secondary mb-4">
                        Click the button below to simulate a page transition or blocked loading state.
                        It will auto-dismiss after 3 seconds.
                    </p>
                    <Button
                        onClick={triggerFullscreen}
                        className="bg-ouro-gold text-white hover:bg-ouro-gold/90"
                    >
                        Trigger Fullscreen (3s)
                    </Button>
                </section>

                {/* Section 2: Inline Test */}
                <section className="bg-surface-card p-6 rounded-lg border border-border-default shadow-sm">
                    <h2 className="text-xl font-medium mb-4">Inline Loader</h2>
                    <p className="text-text-secondary mb-4">
                        Below is an inline loader, suitable for content blocks or suspending components.
                    </p>
                    <div className="border border-dashed border-border-default rounded-md overflow-hidden relative min-h-[300px]">
                        <LoadingScreen variant="inline" message="Carregando Detalhes..." />
                    </div>
                </section>
            </div>

            {/* Conditionally Render Fullscreen Loader */}
            {isFullscreenLoading && (
                <LoadingScreen variant="fullscreen" message="Carregando Aplicação..." />
            )}
        </div>
    );
}
