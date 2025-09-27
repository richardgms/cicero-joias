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
} from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';

const WHATSAPP_NUMBER = '5583991180251';

const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const whatsappLinks = {
  primary: createWhatsAppLink('Olá! Quero falar com a Cícero Joias sobre alianças.'),
  visit: createWhatsAppLink('Olá! Quero agendar uma visita presencial na Cícero Joias.'),
};

export const heroContent = {
  badge: 'JOIAS QUE CONTAM SUA HISTÓRIA',
  title: '4 Décadas Criando Alianças Únicas',
  description:
    'Transforme seu amor em uma joia única: Criamos suas alianças sob medida com acompanhamento pessoal em cada etapa. Quatro décadas de experiência garantem a qualidade que mais de 5 mil casais já confiaram em nós.',
};

type WithIcon<T extends Record<string, unknown>> = T & { icon: LucideIcon | React.ElementType };

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
export const authorityGroups = {
  trajectory: {
    title: 'Nossa Trajetória',
    subtitle: 'Décadas construindo confiança',
    items: [
      {
        value: 'FAMÍLIA',
        label: 'legado geracional',
        description: 'Tradição familiar que passa de geração em geração, mantendo vivos os valores e o cuidado no atendimento personalizado.',
        icon: HeartHandshake,
      },
      {
        value: '+ 5 MIL',
        label: 'casais atendidos',
        description: 'Mais de 5 mil pares de alianças fabricados em nossa oficina, cada um representando o início de uma nova história.',
        icon: Users,
      },
    ],
  },
  commitment: {
    title: 'Nosso Compromisso',
    subtitle: 'Agilidade e qualidade garantidas',
    items: [
      {
        value: '72h',
        label: 'resposta garantida',
        description: 'Receba um orçamento detalhado com valores e fotos em até 72h para suas solicitações de joias sob medida.',
        icon: Clock,
      },
      {
        value: '7 DIAS',
        label: 'produção sob medida',
        description: 'É o prazo médio que levamos para transformar suas referências e ideias em uma aliança única e exclusiva.',
        icon: CalendarDays,
      },
    ],
  },
  experience: {
    title: 'Sua Experiência',
    subtitle: 'Detalhes que fazem a diferença',
    items: [
      {
        value: 'Gravação',
        label: 'personalizada inclusa',
        description: 'Eternize seu amor com a gravação de nomes ou de uma data especial, um detalhe que torna sua joia verdadeiramente única.',
        icon: PenLine,
      },
      {
        value: 'Sem Emendas',
        label: 'técnica superior',
        description: 'Uma técnica de produção superior que cria um círculo perfeito, mais resistente e simbólico para o seu amor eterno.',
        icon: Infinity,
      },
      {
        value: 'Estojo',
        label: 'de veludo incluso',
        description: 'Sua aliança é entregue em um estojo de veludo, garantindo uma apresentação à altura do seu momento especial.',
        icon: Gift,
      },
    ],
  },
};
export const authorityMetrics: Array<WithIcon<{ value: string; label: string; description: string }>> = [
  {
    value: 'Família',
    label: 'legado geracional',
    description: 'Tradição familiar que passa de geração em geração, mantendo vivos os valores e o cuidado no atendimento personalizado.',
    icon: Award,
  },
  {
    value: '+ 5 MIL',
    label: 'casais atendidos',
    description: 'Mais de 5 mil pares de alianças fabricados em nossa oficina, cada um representando o início de uma nova história.',
    icon: Users,
  },
  {
    value: '7 DIAS',
    label: 'PRODUÇÃO SOB MEDIDA',
    description: 'É o prazo médio que levamos para transformar suas referências e ideias em uma aliança única e exclusiva.',
    icon: CalendarDays,
  },
  {
    value: '72h',
    label: 'resposta garantida',
    description: 'Receba um orçamento detalhado com valores e fotos em até 72h para suas solicitações de joias sob medida.',
    icon: Gem,
  },
];

export const authorityAffiliations: Array<WithIcon<{ tag: string; title: string; description: string }>> = [
  {
    tag: 'A APRESENTAÇÃO PERFEITA',
    title: 'Estojo de Veludo Incluso',
    description:
      'Sua aliança é entregue em um estojo de veludo, garantindo uma apresentação à altura do seu momento especial.',
    icon: Gift,
  },
  {
    tag: 'SEU TOQUE PESSOAL',
    title: 'Gravação Personalizada Inclusa',
    description:
      'Eternize seu amor com a gravação de nomes ou de uma data especial, um detalhe que torna sua joia verdadeiramente única.',
    icon: PenLine,
  },
  {
    tag: 'QUALIDADE E SIMBOLISMO',
    title: 'Alianças Feitas Sem Emendas',
    description:
      'Uma técnica de produção superior que cria um círculo perfeito, mais resistente e simbólico para o seu amor eterno.',
    icon: Infinity,
  },
];

export const unifiedDifferentiators: Array<WithIcon<{ title: string; description: string; helper: string }>> = [
  {
    title: 'Expertise Tradicional',
    description:
      'Décadas de especialização combinadas com técnicas manuais refinadas: moldagem, polimento e brilho que garantem qualidade e durabilidade.',
    helper: 'Precisão consolidada',
    icon: Hammer,
  },
  {
    title: 'Certificado Vitalício',
    description:
      'Garantimos para sempre a autenticidade e a pureza do metal nobre da sua aliança.',
    helper: 'Garantia eterna',
    icon: ShieldCheck,
  },
  {
    title: 'Portfólio na Loja',
    description:
      'Apresentamos alianças reais na vitrine para definir largura, textura e gravações com orientação presencial.',
    helper: 'Experimente primeiro',
    icon: Store,
  },
  {
    title: 'Personalização Flexível',
    description:
      'Adaptamos referências enviadas pelo WhatsApp e orientamos o que é viável com prazo médio de 7 dias úteis.',
    helper: 'Exclusivo para você',
    icon: Gem,
  },
  {
    title: 'Manutenção Completa',
    description:
      'Polimentos e ajustes gratuitos nos primeiros 12 meses, com acompanhamento contínuo e cuidado especializado.',
    helper: 'Cuidado duradouro',
    icon: Wrench,
  },
  {
    title: 'Produção Exclusiva',
    description:
      'Joalheria própria com técnicas sem emendas, criando círculos perfeitos mais resistentes e simbólicos.',
    helper: 'Qualidade superior',
    icon: Crown,
  },
];

export const processSteps: Array<WithIcon<{ title: string; description: string; time: string }>> = [
  {
    title: 'Contato pelo WhatsApp',
    description:
      'Mensagem inicial para alinhar estilo, data especial e orçamento.',
    time: 'Etapa 01',
    icon: WhatsappIcon,
  },
  {
    title: 'Escolha guiada',
    description:
      'Visita presencial ou acompanhamento online para definir metais, medidas e acabamento.',
    time: 'Etapa 02',
    icon: HandHeart,
  },
  {
    title: 'Execução especializada',
    description:
      'Nossa equipe executa todo o processo de fabricação, desde a separação do metal até a entrega final.',
    time: 'Etapa 03',
    icon: Hammer,
  },
  {
    title: 'Entrega e manutenção',
    description:
      'Retirada na joalheria ou envio combinado. Polimento gratuito nos primeiros 12 meses.',
    time: 'Etapa 04',
    icon: Sparkles,
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
      'Entrega em 6 dias úteis com gravação interna personalizada e kit de cuidado.',
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
      'Par final entregue em 7 dias úteis com acabamento polido espelhado e certificado de autenticidade.',
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
      'Entregues em 4 dias úteis com brilho recuperado e garantia de manutenção trimestral.',
  },
];

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  role?: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Helena M.',
    location: 'João Pessoa',
    quote: 'Atendimento direto com o ourives nos deixou seguros desde a primeira conversa.',
    image: '/assets/home/testimonials/helena-melo.webp',
  },
  {
    name: 'Ana & Pedro',
    location: 'Cabedelo',
    quote: 'Provar os modelos na loja ajudou a decidir o acabamento perfeito.',
    image: '/assets/home/testimonials/ana-pedro.webp',
  },
  {
    name: 'Julia & Marcos',
    location: 'Santa Rita',
    quote: 'Agendamos pelo WhatsApp, ajustamos medidas e recebemos tudo no prazo.',
    image: '/assets/home/testimonials/julia-marcos.webp',
  },
  {
    name: 'Josivaldo G.',
    location: 'João Pessoa',
    quote: 'Voltamos depois de um ano para polir e as alianças ficaram como novas.',
    image: '/assets/home/testimonials/familia-sousa.webp',
  },
];

export const faqItems = [
  {
    question: 'Qual o prazo médio para produzir as alianças?',
    answer:
      'De 5 a 7 dias úteis após confirmarmos medidas e gravações. Avisamos caso o prazo varie em alta estação.',
  },
  {
    question: 'Posso personalizar sem ir até a loja?',
    answer:
      'Sim. Enviamos fotos, vídeos e catálogo pelo WhatsApp, alinhamos detalhes por chamada e enviamos anéis de prova quando necessário.',
  },
  {
    question: 'Como funciona a manutenção?',
    answer:
      'Polimento e ajuste de medida inclusos nos primeiros 12 meses. Depois disso, oferecemos pacote preferencial. Chame no WhatsApp para agendar.',
  },
];

export const heroStats = [
  {
    value: '40 anos',
    label: 'de expertise consolidada',
    description: 'Experiência Comprovada: Quatro décadas refinando técnicas e criando alianças únicas, com a expertise que só o tempo pode construir.',
  },
  {
    value: '+10 mil',
    label: 'alianças sob medida',
    description: 'Mais de 10 Mil Histórias: Alianças personalizadas que eternizam seu amor, com design exclusivo, medidas exatas e gravações únicas para cada casal.',
  },
   {
    value: '5 estrelas',
    label: 'qualidade profissional',
    description: 'Padrão 5 Estrelas: Cada joia é criada exclusivamente com técnicas refinadas, garantindo um acabamento de excelência que nos tornou referência na região.',
  },
];









