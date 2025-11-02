import React from 'react';
import {
  type LucideIcon,
  Hammer,
  Store,
  ShieldCheck,
  Wrench,
  HandHeart,
  Sparkles,
  Award,
  Users,
  Star,
  Gem,
  Gift,
  PenLine,
  Infinity,
  HeartHandshake,
  Clock,
  CalendarDays,
  Crown,
  Droplet,
} from 'lucide-react';
import {
  WhatsappIcon,
  AliancasIcon,
  BanhoOuroIcon,
  ConsertosIcon,
  JoiasSobMedidaIcon,
  OculosIcon,
  LimpezaIcon,
} from '@/components/icons';

const WHATSAPP_NUMBER = '5583991180251';

const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const whatsappLinks = {
  primary: createWhatsAppLink('Olá! Quero falar com a Cícero Joias.'),
  visit: createWhatsAppLink('Olá! Quero agendar uma visita presencial na Cícero Joias.'),
  services: createWhatsAppLink('Olá! Gostaria de conhecer os serviços da Cícero Joias.'),
};

export const heroContent = {
  badge: 'JOALHERIA COMPLETA COM 40 ANOS DE TRADIÇÃO',
  title: 'Da criação ao cuidado das suas joias: excelência em cada detalhe',
  description:
    'Alianças sob medida, banho de ouro profissional, consertos especializados e muito mais. Atendimento personalizado com a expertise de quatro décadas.',
};

type WithIcon<T extends Record<string, unknown>> = T & { icon: LucideIcon | React.ElementType };

// Services Grid Section
export const servicesGrid: Array<WithIcon<{
  title: string;
  description: string;
  href: string;
}>> = [
  {
    title: 'Alianças Personalizadas',
    description: 'Alianças únicas sob medida com gravação personalizada, técnica sem emendas e certificado vitalício inclusos.',
    href: '/servicos/aliancas-personalizadas',
    icon: AliancasIcon,
  },
  {
    title: 'Banho de Ouro Profissional',
    description: 'Restaure o brilho das suas joias com banho de ouro 18k. Processo profissional que renova e protege suas peças.',
    href: '/servicos/banho-de-ouro',
    icon: BanhoOuroIcon,
  },
  {
    title: 'Consertos Especializados',
    description: 'Recuperação completa de joias: soldas, ajustes de tamanho, troca de pedras e restauração com garantia de qualidade.',
    href: '/servicos/consertos',
    icon: ConsertosIcon,
  },
  {
    title: 'Joias Sob Medida',
    description: 'Transforme suas ideias em joias exclusivas: anéis, brincos, pingentes e colares com design totalmente personalizado.',
    href: '/servicos/joias-sob-medida',
    icon: JoiasSobMedidaIcon,
  },
  {
    title: 'Lentes de Óculos',
    description: 'Troca de lentes para óculos com atendimento especializado. Qualidade, precisão e conforto para sua visão no dia a dia.',
    href: '/servicos/lentes-de-oculos',
    icon: OculosIcon,
  },
  {
    title: 'Limpeza de Joias',
    description: 'Limpeza profissional em prata, ouro e folheado. Restaura o brilho original de suas peças com processo especializado e seguro.',
    href: '/servicos/limpeza-de-joias',
    icon: Droplet,
  },
];

// Hierarchical cards data with main featured card and secondary supporting cards
export const authorityHierarchy = {
  // Main featured card (center/top)
  featured: {
    value: '+ 5 MIL',
    label: 'casais atendidos',
    description: 'Mais de 5 mil pares de alianças fabricados em nossa oficina, cada um representando o início de uma nova história.',
    expandedDetails: 'Nossa jornada começou há quatro décadas com um sonho simples: criar alianças que representem o amor verdadeiro. Hoje, mais de 5 mil casais confiam em nosso trabalho artesanal, cada aliança carregando uma história única de amor e compromisso.',
    stats: [
      { label: 'Anos de experiência', value: '40+' },
      { label: 'Casais atendidos', value: '5.000+' },
      { label: 'Satisfação', value: '98%' },
    ],
    icon: Users,
  },
  // Supporting cards around the main one
  supporting: [
    {
      value: 'FAMÍLIA',
      label: 'legado geracional',
      description: 'Tradição familiar que passa de geração em geração.',
      expandedDetails: 'Nossa empresa é verdadeiramente familiar, com valores transmitidos através das gerações. Este legado garante que cada cliente receba o mesmo cuidado e atenção que dedicaríamos a nossa própria família.',
      icon: HeartHandshake,
    },
    {
      value: '72h',
      label: 'resposta garantida',
      description: 'Orçamento detalhado em até 72h.',
      expandedDetails: 'Entendemos a ansiedade de planejar o momento perfeito. Por isso, garantimos resposta completa com valores, fotos e prazos em até 72 horas, para que vocês possam tomar decisões com tranquilidade.',
      icon: Clock,
    },
    {
      value: '7 DIAS',
      label: 'produção sob medida',
      description: 'Prazo médio para criar sua aliança única.',
      expandedDetails: 'Nossa oficina própria permite controle total sobre prazos e qualidade. Em apenas 7 dias úteis, transformamos suas ideias em realidade, mantendo vocês informados sobre cada etapa do processo.',
      icon: CalendarDays,
    },
    {
      value: 'Gravação',
      label: 'personalizada inclusa',
      description: 'Eternize seu amor com gravações especiais.',
      expandedDetails: 'Cada gravação é feita com técnicas artesanais tradicionais, garantindo durabilidade e beleza. Nomes, datas, símbolos especiais - tudo é possível para tornar sua aliança verdadeiramente única.',
      icon: PenLine,
    },
    {
      value: 'Sem Emendas',
      label: 'técnica superior',
      description: 'Círculo perfeito para o amor eterno.',
      expandedDetails: 'Nossa técnica exclusiva cria alianças sem pontos de soldagem, resultando em um círculo perfeito e contínuo. Além de mais resistente, simboliza a eternidade do amor sem início nem fim.',
      icon: Infinity,
    },
    {
      value: 'Estojo Premium',
      label: 'apresentação especial',
      description: 'Entrega digna do momento especial.',
      expandedDetails: 'Cada aliança é entregue em estojo de veludo premium, acompanhado de certificado de autenticidade e manual de cuidados, garantindo uma apresentação à altura da importância do momento.',
      icon: Gift,
    },
  ],
};

// Keep grouped data for compatibility
// Full differentiators list (kept for service-specific pages)
export const unifiedDifferentiators: Array<WithIcon<{ title: string; description: string; helper: string }>> = [
  {
    title: 'Expertise Tradicional',
    description:
      'Alianças que mantêm o brilho e resistem ao uso diário graças a 40 anos de técnicas refinadas de moldagem e polimento. Mais de 10 mil alianças já entregues comprovam nossa qualidade.',
    helper: 'Precisão consolidada',
    icon: Hammer,
  },
  {
    title: 'Certificado Vitalício',
    description:
      'Garantia eterna de autenticidade e pureza do metal: você tem a segurança de que sua aliança é exatamente o que prometemos, para sempre.',
    helper: 'Garantia eterna',
    icon: ShieldCheck,
  },
  {
    title: 'Teste Presencial',
    description:
      'Experimente modelos reais na loja antes de decidir: escolha largura, textura e acabamento perfeitos com orientação do ourives, sem compromisso.',
    helper: 'Experimente primeiro',
    icon: Store,
  },
  {
    title: 'Personalização Flexível',
    description:
      'Transformamos suas referências em realidade: envie fotos pelo WhatsApp, ajustamos os detalhes e entregamos em média 7 dias. Já personalizamos milhares de alianças únicas.',
    helper: 'Exclusivo para você',
    icon: Gem,
  },
  {
    title: 'Manutenção Completa',
    description:
      'Sua aliança sempre como nova: polimentos e ajustes gratuitos nos primeiros 12 meses. Mais de 5 mil casais já garantiram o brilho duradouro.',
    helper: 'Cuidado duradouro',
    icon: Wrench,
  },
  {
    title: 'Técnica Sem Emendas',
    description:
      'Alianças mais resistentes e confortáveis no dia a dia: nossa técnica exclusiva cria círculos perfeitos sem pontos de soldagem, ideal para quem usa 24h.',
    helper: 'Qualidade superior',
    icon: Crown,
  },
];


export type PortfolioCase = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  challenge: string;
  solution: string;
  result: string;
};

export const portfolioCases: PortfolioCase[] = [
  {
    slug: 'ana-pedro',
    title: 'Ana & Pedro - acabamento fosco com bordas polidas',
    image: '/assets/home/portfolio/case-01.webp',
    alt: 'Alianças foscas com bordas polidas da Cícero Joias',
    challenge:
      'O casal queria alianças foscas que resistissem ao uso diário sem perder brilho nas bordas.',
    solution:
      'Ouro 18k com textura acetinada, bordas polidas e prova presencial para ajustar medidas.',
    result:
      '✓ Entregues em apenas 6 dias úteis com gravação interna personalizada e kit de cuidado completo.',
  },
  {
    slug: 'julia-marcos',
    title: 'Julia & Marcos - gravação interna personalizada',
    image: '/assets/home/portfolio/case-02.webp',
    alt: 'Alianças polidas com gravação interna personalizada',
    challenge:
      'Precisavam de gravação longa com coordenadas e data sem comprometer conforto.',
    solution:
      'Modelagem na loja, teste com anéis de prova e gravação laser feita na bancada do ourives.',
    result:
      '✓ Par final entregue em 7 dias úteis com acabamento polido espelhado e certificado de autenticidade.',
  },
  {
    slug: 'familia-sousa',
    title: 'Família Sousa - restauração de alianças de 1985',
    image: '/assets/home/portfolio/case-03.webp',
    alt: 'Alianças restauradas com brilho renovado',
    challenge:
      'Alianças com riscos profundos e perda de textura original após anos guardadas.',
    solution:
      'Limpeza ultrassom, reforço de solda e retexturização manual inspirada nas fotos antigas.',
    result:
      '✓ Entregues em 4 dias úteis com brilho totalmente recuperado e garantia de manutenção trimestral.',
  },
];

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating?: number;
  source?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Júlia & Carlos T.',
    location: 'João Pessoa',
    quote: 'Trabalho impecável, conseguiram transformar nossas ideias em peças únicas. Voltaria com certeza!',
    rating: 5,
    source: 'Google',
  },
  {
    name: 'Mariana S.',
    location: 'Cabedelo',
    quote: 'Voltamos depois de meses para polir e as joias ficaram como novas. Ótimo atendimento!',
    rating: 5,
    source: 'Google',
  },
  {
    name: 'Roberto L.',
    location: 'Santa Rita',
    quote: 'Minha corrente antiga ficou novinha! O banho de ouro devolveu o brilho original.',
    rating: 5,
    source: 'Google',
  },
  {
    name: 'Fernanda M.',
    location: 'Bayeux',
    quote: 'Levei a corrente na loja e eles consertaram no mesmo dia. Ficou impecável, nem parece que quebrou.',
    rating: 5,
    source: 'Google',
  },
];


export const heroStats = [
  {
    number: 40,
    suffix: ' anos',
    label: 'de tradição',
    description: 'Quatro décadas de excelência em João Pessoa',
  },
  {
    number: 50,
    prefix: '+',
    suffix: ' mil',
    label: 'trabalhos realizados',
    description: 'Mais de 50 mil projetos concluídos com perfeição',
  },
  {
    number: 25,
    suffix: '+',
    label: 'serviços especializados',
    description: 'Joalheria completa: criação, consertos, restauração e muito mais',
  },
];









