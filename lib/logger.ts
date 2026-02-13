const isDev = process.env.NODE_ENV === 'development';

/**
 * Logger condicional — debug logs só aparecem em development.
 * Erros sempre são logados (inclusive em produção).
 */
export const logger = {
    /** Apenas em development */
    debug: (...args: unknown[]) => {
        if (isDev) console.log(...args);
    },
    /** Sempre loga (erros são importantes em produção) */
    error: (...args: unknown[]) => {
        console.error(...args);
    },
    /** Apenas em development */
    warn: (...args: unknown[]) => {
        if (isDev) console.warn(...args);
    },
};
