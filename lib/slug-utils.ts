import slugify from 'slugify';

export interface SlugConfig {
  title: string;
  category?: string;
  material?: string;
  id: string;
}

/**
 * Gera slug personalizado para itens do portfolio
 * Formato: categoria-nome-produto-material-codigo
 * Exemplo: anel-formatura-ouro-18k-abc123
 */
export function generatePortfolioSlug(config: SlugConfig): string {
  const { title, category, material, id } = config;
  
  // Extrair últimos 6 caracteres do ID para código único
  const shortId = id.slice(-6).toLowerCase();
  
  // Mapear categorias para nomes amigáveis
  const categoryMap: Record<string, string> = {
    'WEDDING_RINGS': 'alianca-casamento',
    'REPAIRS_BEFORE_AFTER': 'reparo-conserto',
    'GOLD_PLATING': 'banho-ouro',
    'CUSTOM_JEWELRY': 'joia-personalizada',
    'GRADUATION_RINGS': 'anel-formatura',
  };

  // Mapear materiais comuns
  const materialMap: Record<string, string> = {
    'ouro 18k': 'ouro-18k',
    'ouro 14k': 'ouro-14k',
    'prata': 'prata',
    'platina': 'platina',
  };

  const parts = [];
  
  // Adicionar categoria se disponível
  if (category) {
    const categorySlug = categoryMap[category] || slugify(category, { lower: true, strict: true });
    parts.push(categorySlug);
  }
  
  // Adicionar título do produto
  const titleSlug = slugify(title, { 
    lower: true, 
    strict: true,
    remove: /[*+~.()'"!:@]/g 
  });
  parts.push(titleSlug);
  
  // Adicionar material se disponível
  if (material) {
    const materialSlug = materialMap[material.toLowerCase()] || 
                        slugify(material, { lower: true, strict: true });
    parts.push(materialSlug);
  }
  
  // Adicionar código único
  parts.push(shortId);
  
  return parts.join('-');
}

/**
 * Extrai ID original do slug
 */
export function extractIdFromSlug(slug: string): string | null {
  const parts = slug.split('-');
  const shortId = parts[parts.length - 1];
  
  // Validar se parece com um ID
  if (shortId && shortId.length === 6) {
    return shortId;
  }
  
  return null;
}

/**
 * Valida se um slug está no formato correto
 */
export function isValidPortfolioSlug(slug: string): boolean {
  const parts = slug.split('-');
  return parts.length >= 2 && parts[parts.length - 1].length === 6;
}

/**
 * Gera slug com fallback para evitar duplicatas
 */
export function generateUniqueSlug(
  config: SlugConfig, 
  existingSlugs: string[] = []
): string {
  let baseSlug = generatePortfolioSlug(config);
  let finalSlug = baseSlug;
  let counter = 1;
  
  // Verificar duplicatas e adicionar sufixo se necessário
  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return finalSlug;
} 