import type { LucideIcon } from 'lucide-react';
import {
  MessageCircle,
  Image as ImageIcon,
  ClipboardCheck,
  PackageCheck,
  Hammer,
  ShieldCheck,
  Infinity as InfinityIcon,
  PenLine,
} from 'lucide-react';
import {
  AliancasIcon,
  BanhoOuroIcon,
  ConsertosIcon,
  JoiasSobMedidaIcon,
  OculosIcon,
  LimpezaIcon,
} from '@/components/icons';
import { CONTACT_INFO, createWhatsAppLink } from '@/lib/constants';

export const whatsappLinksV2 = {
  primary: createWhatsAppLink('Olá! Vim pelo site da Cícero Joias e quero conversar.'),
  rings: createWhatsAppLink('Olá! Quero um orçamento de aliança sob medida.'),
  goldPlating: createWhatsAppLink('Olá! Tenho uma joia para banho de ouro. Posso mandar foto?'),
  repair: createWhatsAppLink('Olá! Tenho uma joia para conserto. Posso mandar foto?'),
  visit: createWhatsAppLink('Olá! Quero agendar uma visita presencial.'),
};

export const heroV2 = {
  eyebrow: 'Joalheria artesanal · João Pessoa · desde 1985',
  titleTop: 'Joias feitas na bancada,',
  titleAccent: 'tratadas como história.',
  description:
    'Há 40 anos criando alianças sob medida, restaurando peças de família e renovando o brilho de quem confia em ourives de verdade. Atendimento humano, oficina própria, orçamento pelo WhatsApp.',
  primaryCta: 'Falar com o ourives',
  secondaryCta: 'Ver alianças sob medida',
  credentials: [
    { value: '40', unit: 'anos', label: 'na mesma bancada' },
    { value: '5 mil+', unit: '', label: 'casais com aliança nossa' },
    { value: 'JPA', unit: '', label: 'oficina própria' },
  ],
};

export type FlowStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const flowSteps: FlowStep[] = [
  {
    number: '01',
    title: 'Mande foto ou ideia',
    description:
      'Envie pelo WhatsApp uma foto da joia, uma referência ou até um desenho. Sem formulário, sem cadastro.',
    icon: ImageIcon,
  },
  {
    number: '02',
    title: 'Conversamos pessoalmente',
    description:
      'Quem responde é o ourives. Tiramos dúvidas, sugerimos materiais e contamos o que dá pra fazer.',
    icon: MessageCircle,
  },
  {
    number: '03',
    title: 'Você aprova o orçamento',
    description:
      'Mandamos preço, prazo e detalhes técnicos por escrito. Você decide com calma — sem pressão de venda.',
    icon: ClipboardCheck,
  },
  {
    number: '04',
    title: 'Receba em casa ou retire',
    description:
      'Entregamos em João Pessoa e região, ou você retira na loja com café e prova presencial.',
    icon: PackageCheck,
  },
];

export type ServiceCardV2 = {
  title: string;
  shortLabel: string;
  description: string;
  href: string;
  icon: React.ElementType;
  audience: string;
  featured?: boolean;
};

export const servicesV2: ServiceCardV2[] = [
  {
    title: 'Alianças sob medida',
    shortLabel: 'Alianças',
    description:
      'Ouro 18k, técnica sem emendas, gravação inclusa e prova presencial. Em média 7 dias úteis da aprovação à entrega.',
    audience: 'Para casais que querem aliança única — não a mesma da vitrine de todo mundo.',
    href: '/servicos/aliancas-personalizadas',
    icon: AliancasIcon,
    featured: true,
  },
  {
    title: 'Banho de ouro',
    shortLabel: 'Banho de ouro',
    description:
      'Folheado profissional 18k que devolve o brilho de correntes, anéis e peças de família. Processo controlado em oficina.',
    audience: 'Para quem tem joia parada perdendo cor.',
    href: '/servicos/banho-de-ouro',
    icon: BanhoOuroIcon,
  },
  {
    title: 'Consertos especializados',
    shortLabel: 'Consertos',
    description:
      'Soldas, ajuste de aro, troca de pedras, fecho que não fica mais. Diagnóstico honesto antes de qualquer reparo.',
    audience: 'Para a peça que você ama e achou que não tinha mais jeito.',
    href: '/servicos/consertos',
    icon: ConsertosIcon,
  },
  {
    title: 'Joias sob medida',
    shortLabel: 'Sob medida',
    description:
      'Anéis, brincos, pingentes, colares. Você traz a ideia ou a referência; a gente desenha, prova e ajusta junto.',
    audience: 'Para presentes que precisam fazer sentido.',
    href: '/servicos/joias-sob-medida',
    icon: JoiasSobMedidaIcon,
  },
  {
    title: 'Lentes de óculos',
    shortLabel: 'Lentes',
    description:
      'Troca de lentes com a mesma precisão da joalheria. Atendimento e ajuste pessoal na loja.',
    audience: 'Para quem confia o detalhe a quem cuida do detalhe.',
    href: '/servicos/lentes-de-oculos',
    icon: OculosIcon,
  },
  {
    title: 'Limpeza profissional',
    shortLabel: 'Limpeza',
    description:
      'Limpeza ultrassom em prata, ouro e folheado. Rápido, seguro e devolve o brilho original sem agressão.',
    audience: 'Para a manutenção daquela peça do dia a dia.',
    href: '/servicos',
    icon: LimpezaIcon,
  },
];

export type RingDifferentiator = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const ringDifferentiators: RingDifferentiator[] = [
  {
    title: 'Técnica sem emendas',
    description: 'Círculo contínuo, mais resistente e confortável para quem usa 24h.',
    icon: InfinityIcon,
  },
  {
    title: 'Gravação inclusa',
    description: 'Nomes, datas, coordenadas, símbolos — gravados na bancada, não na máquina pronta.',
    icon: PenLine,
  },
  {
    title: 'Certificado vitalício',
    description: 'Documento de autenticidade do metal e garantia de manutenção pra sempre.',
    icon: ShieldCheck,
  },
  {
    title: 'Polimento na casa',
    description: 'Volte quando quiser para polir e ajustar — primeiros 12 meses são por nossa conta.',
    icon: Hammer,
  },
];

export type TestimonialV2 = {
  name: string;
  location: string;
  service: string;
  quote: string;
};

export const testimonialsV2: TestimonialV2[] = [
  {
    name: 'Júlia & Carlos',
    location: 'João Pessoa',
    service: 'Alianças sob medida',
    quote:
      'A gente mandou só uma foto de referência e o seu Cícero pegou no papel. Saiu exatamente o par que a gente queria — e ainda pudemos provar antes da gravação.',
  },
  {
    name: 'Mariana S.',
    location: 'Cabedelo',
    service: 'Banho de ouro',
    quote:
      'Tinha uma corrente da minha avó perdendo cor. Voltou parecendo nova, sem aquele brilho falso de bijuteria. Fiquei impressionada.',
  },
  {
    name: 'Roberto L.',
    location: 'Santa Rita',
    service: 'Conserto',
    quote:
      'Achei que minha aliança não tinha mais jeito. Fizeram a solda, ajustaram o aro e devolveram no mesmo dia. Atendimento de quem conhece o ofício.',
  },
];

export const contactInfo = CONTACT_INFO;

export { PORTFOLIO_CATEGORY_LABELS as portfolioCategoryLabels } from '@/lib/constants';
