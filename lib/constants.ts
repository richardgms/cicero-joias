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
