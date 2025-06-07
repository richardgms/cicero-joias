# Portfólio - Cícero Joias

Este diretório contém a implementação do sistema de Portfólio para a Cícero Joias, conforme especificado na etapa 2 do plano de desenvolvimento.

## Estrutura de Arquivos

- `page.tsx` - Página principal do portfólio com grid de projetos e filtros por categoria
- `[id]/page.tsx` - Página de detalhes de cada projeto com visualização detalhada e galeria

## Funcionalidades Implementadas

1. **Grid de Projetos com Filtros por Categoria**
   - Sistema de filtros usando Tabs que permite visualizar projetos por categoria
   - Layout responsivo que se adapta a diferentes tamanhos de tela
   - Cards com imagem, título, descrição e tag de categoria

2. **Visualização Detalhada de Cada Projeto**
   - Páginas individuais para cada projeto com rota dinâmica `/portfolio/[id]`
   - Exibição de informações detalhadas, incluindo descrição completa e especificações técnicas
   - Seção de projetos relacionados para navegação contextual

3. **Galerias com Zoom e Navegação**
   - Galeria de imagens com miniaturas clicáveis
   - Exibição principal da imagem selecionada
   - Design responsivo para diferentes dispositivos

## Implementação Técnica

- Utilização de rotas dinâmicas do Next.js para páginas de detalhes
- Componentes reutilizáveis para cards de projetos
- Sistema de dados estruturados para facilitar a manutenção
- CSS com animações e transições para melhorar a experiência do usuário

## Como Expandir

Para adicionar novos projetos ao portfólio:

1. Adicione novos itens ao array `portfolioItems` em ambos os arquivos:
   - `app/portfolio/page.tsx`
   - `app/portfolio/[id]/page.tsx`

2. Adicione as imagens correspondentes em:
   - `public/assets/images/`

3. Para adicionar novas categorias, atualize o array `categories` em ambos os arquivos.

## Integração com o Restante do Site

- Link para o portfólio no menu principal de navegação
- Seção de prévia do portfólio na página inicial
- Botões de CTA para orçamentos a partir das páginas de detalhes

## Próximos Passos Sugeridos

- Implementar paginação para quando o número de projetos crescer
- Adicionar funcionalidade de zoom avançado nas imagens
- Integrar com um CMS para facilitar a atualização do conteúdo
- Adicionar animações de transição entre páginas 