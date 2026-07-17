/**
 * Rotas e constantes do sistema
 * Centraliza URLs e configurações vitais para evitar hardcoding espalhado
 */

export const SYSTEM_ROUTES = {
    HOME: '/',
    ADMIN: {
        DASHBOARD: '/admin',
        LOGIN: '/admin/login',
        PRODUCTS: '/admin/products',
    },
    PUBLIC: {
        SERVICES: '/servicos',
        ABOUT: '/sobre',
        PORTFOLIO: '/portfolio',
    }
};

export const DEFAULT_VISIBLE_PAGES = [
    { slug: 'servicos', title: 'Serviços', href: SYSTEM_ROUTES.PUBLIC.SERVICES, isVisible: true },
    { slug: 'sobre', title: 'Sobre Nós', href: SYSTEM_ROUTES.PUBLIC.ABOUT, isVisible: true },
    { slug: 'portfolio', title: 'Portfólio', href: SYSTEM_ROUTES.PUBLIC.PORTFOLIO, isVisible: true },

];

export const WHATSAPP_NUMBER = '5583991180251';

export const createWhatsAppLink = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const CONTACT_INFO = {
    address: 'Galeria Jardim · Rua Duque de Caxias, 516 — Centro, João Pessoa – PB',
    phone: '(83) 99118-0251',
    phoneHref: `tel:+${WHATSAPP_NUMBER}`,
    email: 'contato@cicerojoias.com.br',
    mapsUrl: 'https://g.page/cicerojoias',
    hours: [
        { days: 'Segunda a sexta', time: '09h às 18h' },
        { days: 'Sábado', time: '09h às 13h' },
    ],
};

export const PORTFOLIO_CATEGORY_LABELS: Record<string, string> = {
    WEDDING_RINGS: 'Alianças',
    REPAIRS_BEFORE_AFTER: 'Conserto · Antes/Depois',
    GOLD_PLATING: 'Banho de ouro',
    CUSTOM_JEWELRY: 'Sob medida',
    GRADUATION_RINGS: 'Anéis de formatura',
};
