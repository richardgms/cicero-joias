import React from 'react';
import { Heart, Users, Award, Clock, Gem, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nossa
              <span className="text-primary"> História</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Mais de quatro décadas dedicadas à arte da joalheria, 
              criando memórias preciosas e momentos inesquecíveis para famílias inteiras.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                Uma jornada de
                <span className="text-primary"> tradição e inovação</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1980 - O Início</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Cícero fundou a joalheria com o sonho de criar peças únicas e duradouras. 
                      Com apenas uma pequena bancada e muito amor pelo ofício, começou atendendo 
                      a comunidade local com dedicação e qualidade.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1990 - Expansão dos Serviços</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Com o crescimento da clientela, expandimos nossos serviços para incluir 
                      alianças personalizadas e consertos especializados. A reputação de qualidade 
                      se espalhou por toda a região.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">2000 - Nova Geração</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Richard se junta ao negócio familiar, trazendo novas ideias e modernizando 
                      os processos. A tradição se combina com inovação para melhor atender 
                      as necessidades dos clientes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Gem className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">2025 - Presença Digital</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Damos um passo importante rumo ao futuro com nossa presença digital, 
                      mantendo nossos valores familiares enquanto alcançamos novos clientes 
                      e oferecemos experiências ainda melhores.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden elegant-shadow">
                <img
                  src="https://images.pexels.com/photos/1670045/pexels-photo-1670045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Oficina de joalheria"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl elegant-shadow max-w-xs">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">40+</div>
                    <div className="text-sm text-slate-600">Anos de tradição</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Confiança construída ao longo de décadas de dedicação e qualidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nossos
              <span className="text-primary"> Valores</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Os princípios que nos guiam em cada projeto e nos conectam com nossos clientes há mais de 40 anos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Tradição',
                description: 'Preservamos técnicas artesanais passadas de geração em geração, mantendo viva a arte da joalheria clássica.'
              },
              {
                icon: Award,
                title: 'Confiança',
                description: 'Construímos relacionamentos duradouros baseados na transparência, honestidade e cumprimento de promessas.'
              },
              {
                icon: Gem,
                title: 'Qualidade Acessível',
                description: 'Oferecemos produtos e serviços de alta qualidade com preços justos e acessíveis para todos.'
              },
              {
                icon: Users,
                title: 'Personalização',
                description: 'Cada cliente é único, e criamos soluções personalizadas que refletem sua personalidade e história.'
              },
              {
                icon: Clock,
                title: 'Atendimento Humanizado',
                description: 'Valorizamos o relacionamento pessoal, oferecendo atenção dedicada e cuidado especial a cada cliente.'
              },
              {
                icon: Star,
                title: 'Inovação',
                description: 'Combinamos tradição com tecnologia moderna para oferecer a melhor experiência possível.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl elegant-shadow text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nossa
              <span className="text-primary"> Equipe</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Conheça as pessoas que tornam a Cícero Joias um lugar especial, onde tradição e inovação se encontram.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Cícero */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 elegant-shadow">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Cícero - Fundador"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Cícero</h3>
              <p className="text-primary font-semibold mb-4">Fundador e Mestre Joalheiro</p>
              <p className="text-slate-600 leading-relaxed">
                Com mais de 40 anos de experiência, Cícero é o coração da empresa. 
                Sua paixão pela joalheria e dedicação aos clientes criaram a base sólida 
                sobre a qual construímos nossa reputação.
              </p>
            </div>

            {/* Richard */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 elegant-shadow">
                <img
                  src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Richard - Coordenador"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Richard</h3>
              <p className="text-primary font-semibold mb-4">Coordenador e Gestor de Projetos</p>
              <p className="text-slate-600 leading-relaxed">
                Responsável pela modernização e gestão estratégica da empresa, 
                Richard combina a tradição familiar com inovação tecnológica para 
                levar a Cícero Joias ao futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Faça parte da nossa
            <span className="text-primary"> história</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Venha conhecer nossa oficina e descobrir como podemos criar algo especial para você. 
            Nossa história continua com cada cliente que confia em nosso trabalho.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/orcamento">Solicitar Orçamento</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <a href="https://wa.me/5583988073784?text=Olá! Gostaria de conhecer mais sobre a Cícero Joias e agendar uma visita.">
                Agendar Visita
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}