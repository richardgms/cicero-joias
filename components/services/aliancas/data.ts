import React from 'react';
import {
  type LucideIcon,
  Users,
  HeartHandshake,
  Clock,
  CalendarDays,
  PenLine,
  Infinity,
  Gift,
  ShieldCheck,
  Hammer,
  Store,
  Crown,
  Gem,
  MessageCircle,
  Ruler,
  Palette,
  PackageCheck,
} from 'lucide-react';
import { AliancasIcon } from '@/components/icons';

const WHATSAPP_NUMBER = '5583991180251';

const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

type WithIcon<T extends Record<string, unknown>> = T & { icon: LucideIcon | React.ElementType };

// Authority Groups - Grupos de credibilidade para alianças personalizadas
export const authorityGroups: Record<string, {
  title: string;
  subtitle: string;
  items: Array<WithIcon<{
    value: string;
    label: string;
    description: string;
  }>>;
}> = {
  confianca: {
    title: 'Confiança Construída',
    subtitle: 'A ESCOLHA DE MILHARES DE CASAIS',
    items: [
      {
        icon: Users,
        value: '5 MIL+',
        label: 'casais atendidos',
        description: 'Mais de 5 mil pares de alianças fabricados em nossa oficina, cada um representando o início de uma nova história de amor.',
      },
      {
        icon: HeartHandshake,
        value: '40+',
        label: 'anos de tradição',
        description: 'Quatro décadas de expertise familiar, com valores e técnicas transmitidos através das gerações.',
      },
    ],
  },
  qualidade: {
    title: 'Qualidade Garantida',
    subtitle: 'TÉCNICAS EXCLUSIVAS E MATERIAIS NOBRES',
    items: [
      {
        icon: Infinity,
        value: 'Sem Emendas',
        label: 'técnica superior',
        description: 'Círculo perfeito e contínuo sem pontos de soldagem. Mais resistente e simboliza a eternidade do amor.',
      },
      {
        icon: ShieldCheck,
        value: 'Certificado',
        label: 'vitalício incluso',
        description: 'Garantia eterna de autenticidade e pureza do metal. Segurança de que sua aliança é exatamente o que prometemos.',
      },
      {
        icon: PenLine,
        value: 'Gravação',
        label: 'personalizada grátis',
        description: 'Eternize seu amor com gravações especiais. Nomes, datas, símbolos - tudo feito com técnicas artesanais.',
      },
    ],
  },
  atendimento: {
    title: 'Atendimento Excepcional',
    subtitle: 'PROCESSO TRANSPARENTE E ÁGIL',
    items: [
      {
        icon: Clock,
        value: '72h',
        label: 'resposta garantida',
        description: 'Orçamento detalhado com valores, fotos e prazos em até 72 horas para sua tranquilidade.',
      },
      {
        icon: CalendarDays,
        value: '7 DIAS',
        label: 'produção média',
        description: 'Oficina própria permite controle total. Em 7 dias úteis, transformamos suas ideias em realidade.',
      },
      {
        icon: Gift,
        value: 'Estojo Premium',
        label: 'apresentação especial',
        description: 'Entrega em estojo de veludo premium com certificado de autenticidade e manual de cuidados.',
      },
    ],
  },
};

// Key Differentiators - Diferenciais principais
export const keyDifferentiators: Array<WithIcon<{
  title: string;
  description: string;
  helper: string;
}>> = [
  {
    title: 'Expertise Consolidada',
    description:
      'Alianças que mantêm o brilho e resistem ao uso diário graças a 40 anos de técnicas refinadas. Mais de 5 mil pares entregues comprovam nossa qualidade superior.',
    helper: 'Precisão tradicional',
    icon: Hammer,
  },
  {
    title: 'Teste Presencial',
    description:
      'Experimente modelos reais na loja antes de decidir: escolha largura, textura e acabamento perfeitos com orientação do ourives, sem compromisso.',
    helper: 'Experimente primeiro',
    icon: Store,
  },
  {
    title: 'Personalização Total',
    description:
      'Transformamos suas referências em realidade: envie fotos pelo WhatsApp, ajustamos os detalhes e entregamos sua aliança única em média 7 dias.',
    helper: 'Exclusivo para você',
    icon: Gem,
  },
  {
    title: 'Técnica Sem Emendas',
    description:
      'Nossa técnica exclusiva cria círculos perfeitos sem pontos de soldagem. Resultado: alianças mais resistentes, confortáveis e simbolicamente perfeitas.',
    helper: 'Qualidade superior',
    icon: Crown,
  },
];

// Process Steps - Etapas do processo
export const processSteps: Array<WithIcon<{
  time: string;
  title: string;
  description: string;
  cta?: {
    label: string;
    link: string;
  };
}>> = [
  {
    icon: MessageCircle,
    time: 'ETAPA 1',
    title: 'Primeiro Contato',
    description:
      'Entre em contato pelo WhatsApp com suas ideias ou referências. Conversamos sobre estilo, material e orçamento.',
    cta: {
      label: 'Iniciar conversa',
      link: createWhatsAppLink('Olá! Quero conhecer o processo de alianças personalizadas.'),
    },
  },
  {
    icon: Ruler,
    time: '24-72h',
    title: 'Orçamento Detalhado',
    description:
      'Receba proposta completa com valores, fotos de modelos similares, prazos e opções de personalização.',
  },
  {
    icon: Palette,
    time: '7 DIAS',
    title: 'Produção Artesanal',
    description:
      'Nossa oficina própria trabalha nas suas alianças com técnicas exclusivas. Você acompanha cada etapa do processo.',
  },
  {
    icon: PackageCheck,
    time: 'ENTREGA',
    title: 'Recebimento Especial',
    description:
      'Alianças entregues em estojo premium com certificado vitalício, manual de cuidados e garantia de manutenção.',
  },
];

// WhatsApp Link - Link único para o CTA principal
export const whatsappLinks = createWhatsAppLink(
  'Olá! Quero criar alianças personalizadas com a Cícero Joias.'
);
