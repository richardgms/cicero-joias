import {
  type LucideIcon,
  Hammer,
  Store,
  ShieldCheck,
  Wrench,
  MessageCircle,
  HandHeart,
  Sparkles,
  Award,
  Users,
  Star,
  Gem
} from 'lucide-react';

const WHATSAPP_NUMBER = '5583988073784';

const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const whatsappLinks = {
  primary: createWhatsAppLink('Ola! Quero falar com a Cicero Joias sobre aliancas.'),
  visit: createWhatsAppLink('Ola! Quero agendar uma visita presencial na Cicero Joias.'),
};

export const heroContent = {
  badge: '40 anos de joalheria artesanal na Paraíba',
  title: 'Cícero Joias: 40 Anos de Amor em Alianças Feitas à Mão.',
  description:
    'Crie suas alianças perfeitas: atendimento personalizado via WhatsApp ou presencial, com o toque único do nosso ourives especialista em cada detalhe.',
};

type WithIcon<T extends Record<string, unknown>> = T & { icon: LucideIcon };

export const authorityMetrics: Array<WithIcon<{ value: string; label: string; description: string }>> = [
  {
    value: '40+',
    label: 'anos de legado',
    description: 'Atuamos desde 1980 com producao artesanal e atendimento direto da familia Cicero.',
    icon: Award,
  },
  {
    value: '1200+',
    label: 'casais atendidos',
    description: 'Alinhamos medidas, acabamentos e gravacoes para eventos em Joao Pessoa e regiao.',
    icon: Users,
  },
  {
    value: '4.9/5',
    label: 'satisfacao media',
    description: 'Notas coletadas nas visitas presenciais e acompanhamentos de manutencao anual.',
    icon: Star,
  },
  {
    value: '72h',
    label: 'resposta garantida',
    description: 'Devolutiva com fotos e valores em ate 72 horas uteis para solicitacoes personalizadas.',
    icon: Gem,
  },
];

export const authorityAffiliations: Array<{ label: string; description: string }> = [
  {
    label: 'Associacao Brasileira de Joalheria Artesanal',
    description: 'Participacao ativa em comite tecnico desde 2015 (registro ABJA-0578).',
  },
  {
    label: 'Programa Joia Segura',
    description: 'Procedimentos de rastreabilidade e laudos de autenticidade para ouro 18k.',
  },
  {
    label: 'Parceria Cerimonialistas do Litoral',
    description: 'Indicacao oficial de assessorias de casamento da Paraiba e Pernambuco.',
  },
];

export const quickProofs: Array<WithIcon<{ title: string; description: string }>> = [
  {
    title: 'Maestria Artesanal',
    description: 'Tradição de 40 anos em alianças, garantindo o brilho e a segurança da sua joia',
    icon: Hammer,
  },
  {
    title: 'Nossa Garantia Vitalícia',
    description: 'Garantimos para sempre a autenticidade e a pureza do metal nobre da sua aliança.',
    icon: ShieldCheck,
  },
  {
    title: 'Suporte Inicial Completo',
    description: 'Oferecemos polimentos e ajustes gratuitos nos primeiros 12 meses em nossas peças.',
    icon: Wrench,
  },
];

export const differentiators: Array<WithIcon<{ title: string; description: string; helper: string }>> = [
  {
    title: 'Oficio do ourives',
    description:
      'Seu Cicero executa corte, solda e polimento manualmente, garantindo acabamento seguro e brilho uniforme.',
    helper: 'Cuidado artesanal',
    icon: Hammer,
  },
  {
    title: 'Portfolio na loja',
    description:
      'Apresentamos aliancas reais na vitrine para definir largura, textura e gravacoes com orientacao presencial.',
    helper: 'Experimente primeiro',
    icon: Store,
  },
  {
    title: 'Personalizacao acessivel',
    description:
      'Adaptamos referencias enviadas pelo WhatsApp e orientamos o que e viavel com prazo medio de 7 dias uteis.',
    helper: 'Sob medida pra voce',
    icon: ShieldCheck,
  },
  {
    title: 'Manutencao garantida',
    description:
      'Oferecemos limpeza, ajuste de medida e polimento sem custo adicional durante os primeiros 12 meses.',
    helper: 'Acompanhamento proximo',
    icon: Wrench,
  },
];

export const processSteps: Array<WithIcon<{ title: string; description: string; time: string }>> = [
  {
    title: 'Contato pelo WhatsApp',
    description:
      'Mensagem inicial para alinhar estilo, data especial e orçamento.',
    time: 'Etapa 01',
    icon: MessageCircle,
  },
  {
    title: 'Escolha guiada',
    description:
      'Visita presencial ou acompanhamento on-line para definir metais, medidas e acabamento.',
    time: 'Etapa 02',
    icon: HandHeart,
  },
  {
    title: 'Ourives em ação',
    description:
      'Seu Cicero executa todo o processo de fabricação, desde a separação do metal até a entrega final.',
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
    alt: 'Aliancas foscas com bordas polidas da Cicero Joias',
    challenge:
      'O casal queria aliancas foscas que resistissem ao uso diario sem perder brilho nas bordas.',
    solution:
      'Ouro 18k com textura acetinada, bordas polidas e prova presencial para ajustar medidas.',
    result:
      'Entrega em 6 dias uteis com gravacao interna personalizada e kit de cuidado.',
  },
  {
    slug: 'julia-marcos',
    title: 'Julia & Marcos - gravacao interna personalizada',
    image: '/assets/home/portfolio/case-02.webp',
    alt: 'Aliancas polidas com gravacao interna personalizada',
    challenge:
      'Precisavam de gravacao longa com coordenadas e data sem comprometer conforto.',
    solution:
      'Modelagem na loja, teste com aneis de prova e gravacao laser feita na bancada do ourives.',
    result:
      'Par final entregue em 7 dias uteis com acabamento polido espelhado e certificado de autenticidade.',
  },
  {
    slug: 'familia-sousa',
    title: 'Familia Sousa - restauracao de aliancas de 1985',
    image: '/assets/home/portfolio/case-03.webp',
    alt: 'Aliancas restauradas com brilho renovado',
    challenge:
      'Aliancas com riscos profundos e perda de textura original apos anos guardadas.',
    solution:
      'Limpeza ultrassom, reforco de solda e retexturizacao manual inspirada nas fotos antigas.',
    result:
      'Entregues em 4 dias uteis com brilho recuperado e garantia de manutencao trimestral.',
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
    location: 'Joao Pessoa',
    role: 'Noiva',
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
    location: 'Recife',
    quote: 'Agendamos pelo WhatsApp, ajustamos medidas e recebemos tudo no prazo.',
    image: '/assets/home/testimonials/julia-marcos.webp',
  },
  {
    name: 'Familia Sousa',
    location: 'Joao Pessoa',
    quote: 'Voltamos depois de um ano para polir e as aliancas ficaram como novas.',
    image: '/assets/home/testimonials/familia-sousa.webp',
  },
];

export const faqItems = [
  {
    question: 'Qual o prazo medio para produzir as aliancas?',
    answer:
      'De 5 a 7 dias uteis apos confirmarmos medidas e gravacoes. Avisamos caso o prazo varie em alta estacao.',
  },
  {
    question: 'Posso personalizar sem ir ate a loja?',
    answer:
      'Sim. Enviamos fotos, videos e catalogo pelo WhatsApp, alinhamos detalhes por chamada e enviamos aneis de prova quando necessario.',
  },
  {
    question: 'Como funciona a manutencao?',
    answer:
      'Polimento e ajuste de medida inclusos nos primeiros 12 meses. Depois disso, oferecemos pacote preferencial. Chame no WhatsApp para agendar.',
  },
];

export const badges = [
  {
    label: '40 anos de joalheria',
    image: '/assets/home/badges/badge-40-anos.png',
  },
  {
    label: 'Atendimento direto com o ourives',
    image: '/assets/home/badges/badge-atendimento-direto.png',
  },
  {
    label: 'Manutencao garantida',
    image: '/assets/home/badges/badge-manutencao.png',
  },
];


export const heroStats = [
  {
    value: '40+ anos',
    label: 'de experiencia artesanal',
    description: 'Tradição que Transforma: Desde 1985, nossa família dedica-se à arte da joalheria, criando alianças com a mesma paixão e cuidado de 40 anos atrás.',
  },
  {
    value: '1200+',
    label: 'aliancas sob medida',
    description: 'Mais de 1200 Histórias: Alianças personalizadas que eternizam seu amor, com design exclusivo, medidas exatas e gravações únicas para cada casal.',
  },
   {
    value: '5 estrelas',
    label: 'qualidade profissional',
    description: 'Padrão 5 Estrelas: Cada joia é criada exclusivamente pelo mestre ourives, garantindo um acabamento de excelência e a qualidade que nos tornou referência na região por anos.',
  },
];









