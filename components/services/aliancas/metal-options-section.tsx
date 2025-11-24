'use client';

import React from 'react';
import { motion } from 'framer-motion';

const metals = [
    {
        id: 'prata-990',
        name: 'Prata 990',
        description: 'Pureza elevada e brilho intenso. A escolha ideal para alianças de compromisso ou para quem prefere a elegância discreta da prata.',
        gradient: 'bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500',
        shadow: 'shadow-[0_0_30px_-5px_rgba(200,200,200,0.3)]',
        textColor: 'text-gray-100',
        ringColor: 'from-gray-100 via-white to-gray-400',
    },
    {
        id: 'ouro-16k',
        name: 'Ouro 16k',
        description: 'Uma tonalidade exclusiva, levemente mais avermelhada. Oferece excelente durabilidade e um custo-benefício surpreendente.',
        gradient: 'bg-gradient-to-br from-[#F5D0A9] via-[#E6B985] to-[#C48E56]',
        shadow: 'shadow-[0_0_30px_-5px_rgba(230,185,133,0.3)]',
        textColor: 'text-[#F5D0A9]',
        ringColor: 'from-[#F5D0A9] via-[#FFE5B4] to-[#C48E56]',
    },
    {
        id: 'ouro-18k',
        name: 'Ouro 18k',
        description: 'O padrão clássico da alta joalheria. O equilíbrio perfeito entre pureza, valor e a cor dourada inconfundível que atravessa gerações.',
        gradient: 'bg-gradient-to-br from-[#FFE5A0] via-[#D4AF37] to-[#996515]',
        shadow: 'shadow-[0_0_30px_-5px_rgba(212,175,55,0.3)]',
        textColor: 'text-ouro',
        ringColor: 'from-[#FFE5A0] via-[#FFFACD] to-[#996515]',
    },
];

export function MetalOptionsSection() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background Emerald Gradient - Matches Project Identity */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E5445] via-esmeralda to-esmeralda-dark" />

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('/assets/texture-noise.png')] mix-blend-overlay" />

            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-esmeralda-light/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-ouro/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h2 className="font-philosopher text-4xl md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-lg">
                        Escolha o Metal <span className="text-ouro italic">Perfeito</span>
                    </h2>
                    <p className="font-montserrat text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Trabalhamos com diferentes metais para que você encontre a aliança que melhor se adapta ao seu estilo e orçamento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {metals.map((metal, index) => (
                        <motion.div
                            key={metal.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.7, ease: "easeOut" }}
                            className="group relative flex flex-col items-center"
                        >
                            {/* Card Background with Glassmorphism */}
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl group-hover:-translate-y-2" />

                            <div className="relative p-8 md:p-10 flex flex-col items-center w-full h-full z-10">

                                {/* Visual Ring Representation */}
                                <div className="relative mb-10 w-40 h-40 flex items-center justify-center">
                                    {/* Outer Glow */}
                                    <div className={`absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${metal.gradient}`} />

                                    {/* The Ring Body - Increased thickness */}
                                    <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${metal.ringColor} p-3 shadow-2xl`}>
                                        {/* Inner Hole - Simulating the empty space */}
                                        <div className="w-full h-full bg-[#122b24] rounded-full flex items-center justify-center relative overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)]">

                                            {/* Subtle inner reflection */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none" />

                                            {/* Shine effect passing through */}
                                            <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rotate-45 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
                                        </div>
                                    </div>
                                </div>

                                <h3 className={`font-philosopher text-3xl font-bold mb-4 ${metal.textColor} drop-shadow-sm`}>
                                    {metal.name}
                                </h3>

                                <p className="font-montserrat text-white/80 leading-relaxed text-center text-base md:text-lg flex-grow">
                                    {metal.description}
                                </p>

                                {/* Decorative bottom element */}
                                <div className={`w-16 h-1 mt-8 rounded-full ${metal.gradient} opacity-60 group-hover:w-24 transition-all duration-500`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
