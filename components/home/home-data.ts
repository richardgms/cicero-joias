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
  Gem,
  Gift,
  PenLine,
  Infinity
} from 'lucide-react';

const WHATSAPP_NUMBER = '5583988073784';

const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const whatsappLinks = {
  primary: createWhatsAppLink('Olá! Quero falar com a Cícero Joias sobre alianças.'),
  visit: createWhatsAppLink('Olá! Quero agendar uma visita presencial na Cícero Joias.'),
};

export const heroContent = {
  badge: 'JOIAS QUE CONTAM SUA HISTÓRIA',
  title: '40 Anos Criando Alianças Sob Medida',
  description:
    'Crie suas alianças perfeitas: atendimento personalizado via WhatsApp ou presencial, com o toque único do nosso ourives especialista em cada detalhe.',
};

type WithIcon<T extends Record<string, unknown>> = T & { icon: LucideIcon };

export const authorityMetrics: Array<WithIcon<{ value: string; label: string; description: string }>> = [
  {
    value: '40',
    label: 'anos de legado',
    description: 'Atuamos desde 1985 com produção artesanal e atendimento direto da família Cícero.',
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
    icon: Star,
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
    title: 'Ofício do ourives',
    description:
      'Seu Cícero executa corte, solda e polimento manualmente, garantindo acabamento seguro e brilho uniforme.',
    helper: 'Cuidado artesanal',
    icon: Hammer,
  },
  {
    title: 'Portfólio na loja',
    description:
      'Apresentamos alianças reais na vitrine para definir largura, textura e gravações com orientação presencial.',
    helper: 'Experimente primeiro',
    icon: Store,
  },
  {
    title: 'Personalização acessível',
    description:
      'Adaptamos referências enviadas pelo WhatsApp e orientamos o que é viável com prazo médio de 7 dias úteis.',
    helper: 'Sob medida para você',
    icon: ShieldCheck,
  },
  {
    title: 'Manutenção garantida',
    description:
      'Oferecemos limpeza, ajuste de medida e polimento sem custo adicional durante os primeiros 12 meses.',
    helper: 'Acompanhamento próximo',
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
      'Visita presencial ou acompanhamento online para definir metais, medidas e acabamento.',
    time: 'Etapa 02',
    icon: HandHeart,
  },
  {
    title: 'Ourives em ação',
    description:
      'Seu Cícero executa todo o processo de fabricação, desde a separação do metal até a entrega final.',
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
    label: 'de experiência artesanal',
    description: 'Tradição que Transforma: Desde 1985, nossa família dedica-se à arte da joalheria, criando alianças com a mesma paixão e cuidado de 40 anos atrás.',
  },
  {
    value: '+10 mil',
    label: 'alianças sob medida',
    description: 'Mais de 10 Mil Histórias: Alianças personalizadas que eternizam seu amor, com design exclusivo, medidas exatas e gravações únicas para cada casal.',
  },
   {
    value: '5 estrelas',
    label: 'qualidade profissional',
    description: 'Padrão 5 Estrelas: Cada joia é criada exclusivamente pelo mestre ourives, garantindo um acabamento de excelência e a qualidade que nos tornou referência na região por anos.',
  },
];









