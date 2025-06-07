import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para criar sua
            <span className="text-primary block">joia dos sonhos?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Nossa equipe especializada está pronta para transformar suas ideias em realidade. 
            Solicite um orçamento sem compromisso e descubra como podemos tornar seu momento especial ainda mais único.
          </p>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Orçamento Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 premium-card-hover">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Solicitar Orçamento</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Preencha nosso formulário e receba um orçamento personalizado para seu projeto em até 24 horas.
              </p>
              <Button size="lg" asChild className="w-full group">
                <Link href="/orcamento">
                  Solicitar Orçamento
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 premium-card-hover">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Falar no WhatsApp</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Prefere conversar diretamente? Entre em contato conosco pelo WhatsApp para tirar dúvidas ou agendar uma visita.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="w-full bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600"
              >
                <a href="https://wa.me/5583988073784?text=Olá! Gostaria de mais informações sobre os serviços da Cícero Joias.">
                  Chamar no WhatsApp
                  <MessageCircle className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Atendimento Rápido</h4>
                <p className="text-sm text-slate-400">Resposta em até 2 horas</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Orçamento Gratuito</h4>
                <p className="text-sm text-slate-400">Sem compromisso</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Consultoria Especializada</h4>
                <p className="text-sm text-slate-400">40+ anos de experiência</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}