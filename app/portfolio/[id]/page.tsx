import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

// Importando os mesmos dados de exemplo da página principal
const portfolioItems = [
  {
    id: 1,
    title: 'Aliança de Ouro 18k Personalizada',
    category: 'aliancas',
    description: 'Aliança de casamento em ouro 18k com detalhes em relevo e acabamento fosco.',
    detailedDescription: `
      Esta aliança de casamento foi meticulosamente elaborada em ouro 18k, apresentando um design 
      exclusivo com detalhes em relevo que conferem personalidade e elegância. O acabamento fosco 
      contrasta harmoniosamente com as áreas polidas, criando um jogo de texturas sofisticado.
      
      Cada peça foi trabalhada individualmente para garantir perfeição no acabamento, conforto no uso 
      diário e durabilidade para simbolizar um compromisso duradouro. 
      
      O interior das alianças recebeu gravação personalizada com as iniciais do casal e a data da celebração, 
      tornando esta peça verdadeiramente única e especial.
    `,
    specifications: [
      { name: 'Material', value: 'Ouro 18k (750)' },
      { name: 'Peso aproximado', value: '8g cada aliança' },
      { name: 'Largura', value: '5mm' },
      { name: 'Acabamento', value: 'Fosco com detalhes polidos' },
      { name: 'Personalização', value: 'Gravação interna incluída' },
      { name: 'Tempo de produção', value: '15 dias úteis' }
    ],
    thumbnail: '/assets/portfolio/alianca-1-thumb.jpg',
    images: [
      '/assets/portfolio/alianca-1-1.jpg',
      '/assets/portfolio/alianca-1-2.jpg',
      '/assets/portfolio/alianca-1-3.jpg',
    ],
    featured: true,
    relatedProjects: [4, 8]
  },
  {
    id: 2,
    title: 'Pingente Personalizado com Diamante',
    category: 'joias',
    description: 'Pingente em ouro branco 18k com diamante central de 0.25 quilates.',
    detailedDescription: `
      Este pingente exclusivo foi confeccionado em ouro branco 18k, apresentando um design contemporâneo
      que valoriza o diamante central de 0.25 quilates com lapidação brilhante.
      
      A peça combina linhas fluidas e orgânicas que emolduram delicadamente a pedra, criando um efeito
      de leveza e elegância. O sistema de fixação foi cuidadosamente projetado para garantir segurança
      e, ao mesmo tempo, permitir que a luz realce ao máximo o brilho do diamante.
      
      Este pingente foi criado como uma peça comemorativa para celebrar um momento especial, unindo
      valor sentimental à excelência em design e execução.
    `,
    specifications: [
      { name: 'Material', value: 'Ouro branco 18k (750)' },
      { name: 'Pedra central', value: 'Diamante natural de 0.25ct' },
      { name: 'Cor/Pureza do diamante', value: 'F/VS2' },
      { name: 'Peso aproximado', value: '3.8g' },
      { name: 'Acabamento', value: 'Polido com rodio' },
      { name: 'Tempo de produção', value: '20 dias úteis' }
    ],
    thumbnail: '/assets/portfolio/pingente-1-thumb.jpg',
    images: [
      '/assets/portfolio/pingente-1-1.jpg',
      '/assets/portfolio/pingente-1-2.jpg',
    ],
    featured: true,
    relatedProjects: [5, 7]
  },
  {
    id: 3,
    title: 'Restauração de Relógio Vintage',
    category: 'consertos',
    description: 'Restauração completa de relógio vintage com substituição de peças e polimento.',
    detailedDescription: `
      Este projeto de restauração envolveu um relógio vintage de valor sentimental para o cliente,
      originalmente adquirido na década de 1960. O trabalho incluiu uma revisão completa do mecanismo,
      com substituição de componentes desgastados e limpeza profissional.
      
      A caixa e pulseira receberam tratamento de polimento e acabamento que respeitou as características
      originais da peça, preservando seu caráter vintage enquanto renovava sua aparência. O vidro
      arranhado foi substituído por um novo com as mesmas especificações do original.
      
      O resultado final foi um relógio totalmente funcional que mantém sua autenticidade histórica,
      agora pronto para ser usado por muitos anos ou passado como herança familiar.
    `,
    specifications: [
      { name: 'Tipo de relógio', value: 'Automático vintage (1960s)' },
      { name: 'Serviços realizados', value: 'Revisão completa do mecanismo, substituição de peças, polimento' },
      { name: 'Peças substituídas', value: 'Coroa, vidro, algumas engrenagens internas' },
      { name: 'Material da caixa', value: 'Aço inoxidável' },
      { name: 'Garantia do serviço', value: '6 meses' },
      { name: 'Tempo de execução', value: '30 dias' }
    ],
    thumbnail: '/assets/portfolio/conserto-1-thumb.jpg',
    images: [
      '/assets/portfolio/conserto-1-1.jpg',
      '/assets/portfolio/conserto-1-2.jpg',
      '/assets/portfolio/conserto-1-3.jpg',
    ],
    featured: false,
    relatedProjects: [6]
  },
  {
    id: 4,
    title: 'Aliança de Prata com Gravação',
    category: 'aliancas',
    description: 'Aliança de compromisso em prata 950 com gravação personalizada interna.',
    detailedDescription: `
      Esta aliança de compromisso foi produzida em prata 950, um material nobre que combina beleza,
      durabilidade e valor acessível. O design minimalista valoriza a elegância da forma pura, com
      um perfil confortável para uso diário.
      
      A gravação interna foi realizada com tecnologia a laser, garantindo precisão e permanência ao
      texto escolhido pelo cliente - uma data significativa e uma mensagem curta que simboliza o
      compromisso.
      
      O acabamento recebeu polimento espelhado, que realça o brilho natural da prata e contrasta
      com a simplicidade do design, criando uma peça atemporal que pode ser usada em qualquer ocasião.
    `,
    specifications: [
      { name: 'Material', value: 'Prata 950' },
      { name: 'Peso aproximado', value: '5g' },
      { name: 'Largura', value: '4mm' },
      { name: 'Acabamento', value: 'Polido espelhado' },
      { name: 'Personalização', value: 'Gravação interna a laser' },
      { name: 'Tempo de produção', value: '7 dias úteis' }
    ],
    thumbnail: '/assets/portfolio/alianca-2-thumb.jpg',
    images: [
      '/assets/portfolio/alianca-2-1.jpg',
      '/assets/portfolio/alianca-2-2.jpg',
    ],
    featured: false,
    relatedProjects: [1, 8]
  },
  {
    id: 5,
    title: 'Pulseira de Ouro com Pedras',
    category: 'joias',
    description: 'Pulseira em ouro 18k com pedras semipreciosas em engaste pavê.',
    detailedDescription: `
      Esta pulseira sofisticada foi desenvolvida em ouro 18k amarelo, combinando a riqueza do metal
      com o colorido vibrante de pedras semipreciosas cuidadosamente selecionadas. O design apresenta
      uma estrutura flexível que se adapta confortavelmente ao pulso.
      
      As pedras foram dispostas em engaste pavê, uma técnica que maximiza o brilho ao criar uma superfície
      contínua de gemas, sem deixar quase nenhum metal visível entre elas. Foram utilizadas turmalinas,
      ametistas e citrinos de alta qualidade, criando um degradê de cores que torna a peça única.
      
      O fecho foi projetado com sistema duplo de segurança, garantindo que a pulseira permaneça
      segura durante o uso enquanto mantém a elegância do conjunto.
    `,
    specifications: [
      { name: 'Material', value: 'Ouro amarelo 18k (750)' },
      { name: 'Pedras', value: 'Turmalinas, ametistas e citrinos naturais' },
      { name: 'Tipo de engaste', value: 'Pavê' },
      { name: 'Comprimento', value: 'Ajustável 17-19cm' },
      { name: 'Peso aproximado', value: '12.5g' },
      { name: 'Tempo de produção', value: '25 dias úteis' }
    ],
    thumbnail: '/assets/portfolio/pulseira-1-thumb.jpg',
    images: [
      '/assets/portfolio/pulseira-1-1.jpg',
      '/assets/portfolio/pulseira-1-2.jpg',
    ],
    featured: true,
    relatedProjects: [2, 7]
  },
  {
    id: 6,
    title: 'Recuperação de Óculos Vintage',
    category: 'oculos',
    description: 'Recuperação de armação vintage com substituição de lentes e ajustes.',
    detailedDescription: `
      Este projeto envolveu a recuperação de uma armação de óculos vintage de acetato italiano dos anos 1970,
      uma peça de valor afetivo para o cliente. O trabalho incluiu a restauração completa da armação,
      com repolimento do acetato, substituição de dobradiças originais e reajuste estrutural.
      
      As lentes antigas foram substituídas por novas lentes de resina com tratamento antirreflexo e
      proteção contra luz azul, adaptadas às necessidades visuais atuais do cliente, mas mantendo a
      estética original da peça.
      
      Pequenos detalhes metálicos foram refeitos artesanalmente para manter a fidelidade ao design
      original, demonstrando nossa capacidade de combinar técnicas tradicionais com tecnologias modernas
      de ótica.
    `,
    specifications: [
      { name: 'Material da armação', value: 'Acetato italiano (1970s)' },
      { name: 'Serviços realizados', value: 'Restauração da armação, substituição de dobradiças, polimento' },
      { name: 'Lentes', value: 'Resina com tratamento antirreflexo e proteção luz azul' },
      { name: 'Ajustes', value: 'Personalizado para anatomia do cliente' },
      { name: 'Garantia do serviço', value: '1 ano' },
      { name: 'Tempo de execução', value: '15 dias' }
    ],
    thumbnail: '/assets/portfolio/oculos-1-thumb.jpg',
    images: [
      '/assets/portfolio/oculos-1-1.jpg',
      '/assets/portfolio/oculos-1-2.jpg',
    ],
    featured: false,
    relatedProjects: [3]
  },
  {
    id: 7,
    title: 'Conjunto de Brincos e Colar',
    category: 'joias',
    description: 'Conjunto harmonizado de brincos e colar em ouro 18k com desenho floral.',
    detailedDescription: `
      Este conjunto harmonizado foi criado para uma ocasião especial, inspirado pela delicadeza de
      formas florais. Tanto o colar quanto os brincos foram confeccionados em ouro 18k amarelo,
      com acabamento alternando áreas polidas e fosqueadas que conferem dimensão e movimento às peças.
      
      O design do colar apresenta um pingente central com forma abstrata inspirada em uma flor de lótus,
      sustentado por uma corrente delicada de elos especiais. Os brincos seguem o mesmo motivo em
      uma escala proporcional, criando uma unidade estética sem redundância.
      
      Pequenos detalhes em ouro branco foram adicionados estrategicamente para criar pontos de luz e
      contraste, enriquecendo o conjunto sem comprometer sua elegância minimalista.
    `,
    specifications: [
      { name: 'Material', value: 'Ouro amarelo 18k (750) com detalhes em ouro branco' },
      { name: 'Peso aproximado', value: 'Colar: 6.2g / Par de brincos: 3.8g' },
      { name: 'Comprimento do colar', value: '45cm com extensor' },
      { name: 'Tipo de fecho', value: 'Lagosta com extensor' },
      { name: 'Acabamento', value: 'Combinação de polido e fosco' },
      { name: 'Tempo de produção', value: '20 dias úteis' }
    ],
    thumbnail: '/assets/portfolio/conjunto-1-thumb.jpg',
    images: [
      '/assets/portfolio/conjunto-1-1.jpg',
      '/assets/portfolio/conjunto-1-2.jpg',
      '/assets/portfolio/conjunto-1-3.jpg',
    ],
    featured: true,
    relatedProjects: [2, 5]
  },
  {
    id: 8,
    title: 'Aliança Fosca com Diamantes',
    category: 'aliancas',
    description: 'Aliança de casamento com acabamento fosco e linha de diamantes.',
    detailedDescription: `
      Esta sofisticada aliança de casamento combina o acabamento fosco do ouro 18k com uma linha de
      pequenos diamantes incrustados, criando um contraste elegante entre a textura mate do metal e
      o brilho das pedras preciosas.
      
      O design apresenta um perfil ligeiramente abaulado que proporciona grande conforto no uso diário,
      enquanto a distribuição precisa dos diamantes cria um efeito de luz contínuo ao redor da peça.
      Cada diamante foi selecionado individualmente para garantir uniformidade de cor e brilho.
      
      A parte interna recebeu acabamento polido e gravação personalizada com técnica a laser, incluindo
      as iniciais do casal e uma mensagem significativa que permanecerá como um segredo compartilhado.
    `,
    specifications: [
      { name: 'Material', value: 'Ouro 18k (750)' },
      { name: 'Diamantes', value: '12 diamantes naturais de 0.01ct cada' },
      { name: 'Cor/Pureza dos diamantes', value: 'G/VS' },
      { name: 'Peso aproximado', value: '9g cada aliança' },
      { name: 'Acabamento', value: 'Externo fosco, interno polido' },
      { name: 'Tempo de produção', value: '18 dias úteis' }
    ],
    thumbnail: '/assets/portfolio/alianca-3-thumb.jpg',
    images: [
      '/assets/portfolio/alianca-3-1.jpg',
      '/assets/portfolio/alianca-3-2.jpg',
    ],
    featured: true,
    relatedProjects: [1, 4]
  },
];

// Categorias para filtro (as mesmas da página principal)
const categories = [
  { id: 'todos', name: 'Todos os Projetos' },
  { id: 'aliancas', name: 'Alianças' },
  { id: 'joias', name: 'Joias' },
  { id: 'consertos', name: 'Consertos' },
  { id: 'oculos', name: 'Óculos' },
];

// Componente para a página de detalhes do portfólio
export default function PortfolioItemPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const item = portfolioItems.find(item => item.id === id);
  
  if (!item) {
    notFound();
  }

  // Buscando projetos relacionados
  const relatedItems = item.relatedProjects
    ? portfolioItems.filter(p => item.relatedProjects!.includes(p.id))
    : [];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-16 bg-marfim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center text-esmeralda hover:text-ouro mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" />
            <span>Voltar para o Portfólio</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            {/* Galeria de Imagens */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="bg-white rounded-2xl p-4 elegant-shadow">
                {/* Imagem Principal */}
                <div className="relative h-80 md:h-96 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Miniaturas */}
                <div className="grid grid-cols-3 gap-4">
                  {item.images.map((image, index) => (
                    <div key={index} className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                      <Image
                        src={image}
                        alt={`${item.title} - imagem ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 15vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Informações do Projeto */}
            <div className="lg:w-1/2">
              <div className="mb-2">
                <span className="text-sm font-semibold text-esmeralda-light bg-esmeralda/10 px-3 py-1 rounded-full">
                  {categories.find(cat => cat.id === item.category)?.name || 'Outro'}
                </span>
                {item.featured && (
                  <span className="ml-2 text-sm font-semibold text-ouro-light bg-ouro/10 px-3 py-1 rounded-full">
                    Destaque
                  </span>
                )}
              </div>
              
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-esmeralda mb-4">
                {item.title}
              </h1>
              
              <div className="prose prose-lg max-w-none text-esmeralda-light mb-8">
                <p className="text-lg font-medium text-esmeralda-light mb-4">
                  {item.description}
                </p>
                <div className="whitespace-pre-line">
                  {item.detailedDescription}
                </div>
              </div>
              
              {/* Especificações */}
              <div className="bg-white rounded-xl p-6 mb-8 elegant-shadow">
                <h3 className="text-xl font-bold text-esmeralda mb-4">Especificações</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.specifications.map((spec, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm text-esmeralda-light">{spec.name}</span>
                      <span className="font-medium text-esmeralda">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-ouro text-esmeralda hover:bg-ouro-light">
                  <Link href="/orcamento">
                    Solicitar Orçamento Semelhante
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim">
                  <Link href="https://wa.me/5583988073784">
                    Falar no WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projetos Relacionados */}
      {relatedItems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-esmeralda mb-8">
              Projetos Relacionados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedItems.map((relatedItem) => (
                <Link href={`/portfolio/${relatedItem.id}`} key={relatedItem.id} className="group">
                  <div className="bg-marfim rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={relatedItem.thumbnail}
                        alt={relatedItem.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-esmeralda mb-3 group-hover:text-ouro transition-colors">
                        {relatedItem.title}
                      </h3>
                      <p className="text-esmeralda-light text-sm mb-4 flex-grow">
                        {relatedItem.description}
                      </p>
                      <Button variant="outline" className="w-full border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-marfim mt-auto">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}