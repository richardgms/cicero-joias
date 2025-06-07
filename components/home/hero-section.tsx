'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Star, Gem, ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Overlay com a cor Esmeralda */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(19, 54, 41, 0.8), rgba(19, 54, 41, 0.95)), url('https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-marfim">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-esmeralda-light/20 backdrop-blur-md rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-ouro" />
            <span className="text-sm font-medium">Mais de 40 anos de tradição</span>
          </div>

          {/* Main Title */}
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Tradição que se
            <span className="block text-ouro gold-gradient bg-clip-text text-transparent">
              Renova
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-marfim-dark mb-8 max-w-3xl mx-auto leading-relaxed">
            Criamos momentos especiais através de joias únicas, alianças personalizadas e serviços de qualidade excepcional.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild className="group bg-ouro text-grafite hover:bg-ouro-light">
              <Link href="/orcamento">
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-esmeralda-light/10 backdrop-blur-md border-marfim/20 text-marfim hover:bg-esmeralda-light/20">
              <Link href="/portfolio">
                Ver Nosso Trabalho
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-ouro mr-2" />
                <span className="text-3xl font-bold">40+</span>
              </div>
              <p className="text-marfim-dark">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Gem className="w-6 h-6 text-ouro mr-2" />
                <span className="text-3xl font-bold">1000+</span>
              </div>
              <p className="text-marfim-dark">Alianças Criadas</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-ouro mr-2" />
                <span className="text-3xl font-bold">500+</span>
              </div>
              <p className="text-marfim-dark">Clientes Satisfeitos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-marfim animate-bounce">
        <div className="w-6 h-10 border-2 border-marfim rounded-full flex justify-center">
          <div className="w-1 h-3 bg-ouro rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}