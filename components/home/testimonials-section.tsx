import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Noiva',
    content: 'A Cícero Joias tornou nosso sonho realidade! Nossas alianças ficaram perfeitas, exatamente como imaginávamos. O atendimento foi excepcional desde o primeiro contato.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Cliente fiel há 15 anos',
    content: 'Já consertei várias joias de família aqui e sempre saio satisfeito. A qualidade do trabalho é impecável e o preço justo. Recomendo de olhos fechados!',
    rating: 5,
    image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Ana Costa',
    role: 'Formanda',
    content: 'Meu anel de formatura ficou lindo! Eles me ajudaram a personalizar cada detalhe. É muito gratificante trabalhar com pessoas que realmente se importam com o resultado.',
    rating: 5,
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            O que nossos
            <span className="text-primary"> clientes dizem</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A satisfação dos nossos clientes é o nosso maior tesouro. 
            Veja alguns depoimentos de quem confia na Cícero Joias.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl elegant-shadow premium-card-hover relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-600 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 bg-white rounded-2xl p-8 elegant-shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-slate-600">Satisfação dos Clientes</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9</div>
              <p className="text-slate-600">Avaliação Média</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-slate-600">Clientes Atendidos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">40+</div>
              <p className="text-slate-600">Anos de Experiência</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}