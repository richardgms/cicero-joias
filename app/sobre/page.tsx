import React from 'react';
import { Heart, Shield, Gem, Users, Clock, Award, Star, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#133629' }}>
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
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-marfim">
              Nossa
              <span className="text-ouro"> História</span>
            </h1>
            <p className="text-xl text-marfim-dark leading-relaxed">
              Mais de quatro décadas dedicadas à arte da joalheria, 
              criando memórias preciosas e momentos inesquecíveis para famílias inteiras.
            </p>
          </div>
        </div>
      </section>

      {/* História Section */}
      <section className="py-24 bg-marfim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-esmeralda mb-4">
              40 Anos de 
              <span className="text-ouro"> Tradição</span>
            </h2>
          </div>

          <div className="prose prose-lg max-w-4xl mx-auto text-esmeralda-light">
            <p className="mb-6">
              A história da Cícero Joias começou em 1985, quando o mestre joalheiro Cícero fundou sua primeira oficina em Santa Rita, Paraíba. Movido pela paixão pela arte da joalheria e pelo desejo de criar peças que eternizassem momentos especiais, Cícero iniciou um legado que hoje completa 40 anos de tradição e excelência.
            </p>
            
            <p className="mb-6">
              O que começou como uma pequena oficina especializada em consertos de joias e relógios, rapidamente ganhou reconhecimento pela qualidade excepcional do trabalho e pelo atendimento personalizado. A confiança dos clientes permitiu que o negócio crescesse organicamente, sempre mantendo os valores de honestidade, qualidade e dedicação que caracterizam a Cícero Joias até hoje.
            </p>

            <div className="my-12 bg-white p-8 rounded-2xl elegant-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-esmeralda rounded-full flex items-center justify-center">
                      <Star className="w-8 h-8 text-marfim" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-esmeralda mb-2">1985</h3>
                  <p className="text-esmeralda-light">Fundação da primeira oficina em Santa Rita, Paraíba</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-esmeralda rounded-full flex items-center justify-center">
                      <Gem className="w-8 h-8 text-marfim" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-esmeralda mb-2">2000</h3>
                  <p className="text-esmeralda-light">Expansão com a abertura da segunda loja em Santa Rita</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-esmeralda rounded-full flex items-center justify-center">
                      <RotateCw className="w-8 h-8 text-marfim" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-esmeralda mb-2">Hoje</h3>
                  <p className="text-esmeralda-light">Segunda geração da família integrando inovação ao negócio</p>
                </div>
              </div>
            </div>

            <p className="mb-6">
              Em meados de 2000, expandimos nossa presença com a abertura da segunda loja em Santa Rita, ampliando nosso alcance e permitindo atender um número maior de clientes na região. Ao longo das décadas, enfrentamos desafios e celebramos conquistas, sempre com o compromisso inabalável de oferecer o melhor aos nossos clientes.
            </p>
            
            <p className="mb-6">
              A tradição familiar é um dos pilares mais importantes da Cícero Joias. Hoje, a segunda geração da família já integra o negócio, trazendo inovação e novas perspectivas, enquanto preserva a essência e os valores que construíram nossa reputação. Esta combinação de tradição e renovação nos permite evoluir constantemente, mantendo a qualidade artesanal que nos diferencia no mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-esmeralda mb-4">
              Missão, Visão e
              <span className="text-ouro"> Valores</span>
            </h2>
            <p className="text-lg text-esmeralda-light max-w-3xl mx-auto">
              Os princípios que nos guiam em cada projeto e nos conectam com nossos clientes há mais de 40 anos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="bg-marfim p-8 rounded-2xl elegant-shadow premium-card-hover">
              <div className="w-16 h-16 bg-esmeralda rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-ouro" />
              </div>
              <h3 className="text-xl font-bold text-esmeralda mb-4">Nossa Missão</h3>
              <p className="text-esmeralda-light">
                Transformar momentos especiais em memórias eternas através de joias e serviços de qualidade, acessíveis e personalizados, honrando a confiança depositada em nosso trabalho há quatro décadas.
              </p>
            </div>

            <div className="bg-marfim p-8 rounded-2xl elegant-shadow premium-card-hover">
              <div className="w-16 h-16 bg-esmeralda rounded-lg flex items-center justify-center mb-6">
                <Gem className="w-8 h-8 text-ouro" />
              </div>
              <h3 className="text-xl font-bold text-esmeralda mb-4">Nossa Visão</h3>
              <p className="text-esmeralda-light">
                Ser reconhecida como a joalheria de referência em João Pessoa e Santa Rita para alianças personalizadas e serviços especializados, combinando tradição, confiança e inovação para criar experiências memoráveis para nossos clientes.
              </p>
            </div>

            <div className="bg-marfim p-8 rounded-2xl elegant-shadow premium-card-hover">
              <div className="w-16 h-16 bg-esmeralda rounded-lg flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-ouro" />
              </div>
              <h3 className="text-xl font-bold text-esmeralda mb-4">Nossos Valores</h3>
              <ul className="text-esmeralda-light space-y-2">
                <li className="flex items-start">
                  <span className="text-ouro mr-2">•</span>
                  <span><strong>Tradição e Confiança:</strong> Honramos nossos 40 anos de história através de práticas éticas e transparentes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ouro mr-2">•</span>
                  <span><strong>Qualidade Artesanal:</strong> Cada peça recebe atenção meticulosa aos detalhes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ouro mr-2">•</span>
                  <span><strong>Personalização:</strong> Valorizamos a história única de cada cliente.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Especialidade */}
      <section className="py-24 bg-gradient-to-b from-marfim to-marfim-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-esmeralda mb-4">
              Nossa
              <span className="text-ouro"> Especialidade</span>
            </h2>
            <p className="text-lg text-esmeralda-light max-w-3xl mx-auto">
              A Cícero Joias se destaca pela excelência em áreas específicas da joalheria, desenvolvidas e aperfeiçoadas ao longo de quatro décadas de dedicação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Alianças Personalizadas',
                description: 'Nossa principal especialidade é a criação de alianças exclusivas em ouro 16k, 18k e prata, cuidadosamente elaboradas para simbolizar compromissos duradouros.'
              },
              {
                icon: RotateCw,
                title: 'Banho de Ouro Profissional',
                description: 'Oferecemos serviço especializado de banho de ouro, permitindo renovar peças antigas ou transformar itens especiais com acabamento dourado de alta qualidade.'
              },
              {
                icon: Shield,
                title: 'Consertos Especializados',
                description: 'Nossa expertise técnica nos permite realizar consertos complexos em joias, relógios e óculos, devolvendo vida e funcionalidade a peças de valor.'
              },
              {
                icon: Gem,
                title: 'Joias Sob Medida',
                description: 'Criamos joias personalizadas que contam histórias e eternizam momentos, trabalhando em estreita colaboração com nossos clientes do início ao fim.'
              },
              {
                icon: Users,
                title: 'Lentes de Óculos',
                description: 'Oferecemos lentes de alta qualidade, com foco em conforto visual, durabilidade e estilo. Trabalhamos com diversos tipos de lentes para atender suas necessidades.'
              },
              {
                icon: Award,
                title: 'Compromisso com a Qualidade',
                description: 'Na Cícero Joias, qualidade não é apenas um objetivo, mas um compromisso diário. Cada peça passa por rigorosos controles que garantem perfeição.'
              }
            ].map((specialty, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl elegant-shadow premium-card-hover">
                <div className="w-14 h-14 bg-esmeralda/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-esmeralda group-hover:scale-110 transition-all duration-300">
                  <specialty.icon className="w-7 h-7 text-esmeralda group-hover:text-marfim transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-esmeralda mb-3 group-hover:text-ouro transition-colors duration-300">
                  {specialty.title}
                </h3>
                <p className="text-esmeralda-light leading-relaxed">
                  {specialty.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#133629' }}>
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-marfim">
            Conecte-se
            <span className="text-ouro"> Conosco</span>
          </h2>
          
          <p className="text-xl text-marfim-dark mb-8 max-w-3xl mx-auto">
            Convidamos você a fazer parte da história da Cícero Joias. Visite nossas lojas, conheça nosso trabalho e descubra como podemos transformar seus momentos especiais em memórias eternas.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-ouro text-grafite hover:bg-ouro-light">
              <Link href="/orcamento">
                Solicitar Orçamento
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-marfim text-marfim hover:bg-esmeralda-light/20">
              <Link href="https://wa.me/5583988073784">
                Falar no WhatsApp
              </Link>
            </Button>
          </div>

          <div className="mt-16 text-marfim text-sm">
            <p>
              Cícero Joias: Tradição que se renova a cada momento especial.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}