import React from 'react';
import { 
  Heart, 
  Shield, 
  Gem, 
  Users, 
  Clock, 
  Award 
} from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Tradição Familiar',
    description: 'Mais de 40 anos de experiência passada de geração em geração, mantendo os valores e a qualidade que nos tornaram referência.'
  },
  {
    icon: Shield,
    title: 'Confiança Absoluta',
    description: 'Garantia em todos os nossos serviços e produtos. Sua satisfação é nossa prioridade número um.'
  },
  {
    icon: Gem,
    title: 'Qualidade Premium',
    description: 'Utilizamos apenas materiais de primeira qualidade e técnicas refinadas para criar peças excepcionais.'
  },
  {
    icon: Users,
    title: 'Atendimento Personalizado',
    description: 'Cada cliente é único. Oferecemos consultoria especializada para criar a joia perfeita para você.'
  },
  {
    icon: Clock,
    title: 'Agilidade e Pontualidade',
    description: 'Respeitamos prazos e mantemos você informado sobre cada etapa do processo de criação.'
  },
  {
    icon: Award,
    title: 'Excelência Reconhecida',
    description: 'Nossa reputação foi construída ao longo de décadas de dedicação e compromisso com a excelência.'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-marfim to-marfim-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-esmeralda mb-4">
            Por que escolher a
            <span className="text-ouro"> Cícero Joias?</span>
          </h2>
          <p className="text-lg text-esmeralda-light max-w-3xl mx-auto leading-relaxed">
            Combinamos tradição e inovação para oferecer a melhor experiência em joalheria. 
            Conheça os valores que nos guiam há mais de quatro décadas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl elegant-shadow premium-card-hover border border-marfim-dark"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-esmeralda/10 rounded-2xl flex items-center justify-center group-hover:bg-esmeralda group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-esmeralda group-hover:text-marfim transition-colors duration-300" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-esmeralda mb-3 group-hover:text-ouro transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-esmeralda-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 bg-esmeralda rounded-2xl text-marfim">
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Pronto para criar sua joia dos sonhos?
            </h3>
            <p className="text-marfim-dark mb-6 max-w-md">
              Nossa equipe está preparada para transformar suas ideias em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/orcamento"
                className="inline-flex items-center justify-center px-6 py-3 bg-ouro text-grafite font-semibold rounded-lg hover:bg-ouro-light transition-colors"
              >
                Solicitar Orçamento
              </a>
              <a
                href="https://wa.me/5583988073784?text=Olá! Gostaria de mais informações sobre os serviços da Cícero Joias."
                className="inline-flex items-center justify-center px-6 py-3 border border-esmeralda-dark text-marfim font-semibold rounded-lg hover:bg-esmeralda-dark transition-colors"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}