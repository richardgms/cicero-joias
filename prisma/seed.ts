import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding page visibility settings...')

  // Páginas do sistema com configurações padrão
  const pages = [
    {
      slug: 'pronta-entrega',
      title: 'Pronta Entrega',
      description: 'Página de produtos prontos para entrega imediata',
      isVisible: false, // Inicialmente desabilitada conforme solicitado
      priority: 1
    },
    {
      slug: 'portfolio',
      title: 'Portfólio',
      description: 'Galeria de trabalhos realizados pela Cícero Joias',
      isVisible: true,
      priority: 3
    },
    {
      slug: 'sobre',
      title: 'Sobre Nós',
      description: 'História e informações sobre a Cícero Joias',
      isVisible: true,
      priority: 4
    },
    {
      slug: 'servicos',
      title: 'Serviços',
      description: 'Página com os serviços oferecidos pela Cícero Joias',
      isVisible: true,
      priority: 2
    },
    {
      slug: 'minha-area',
      title: 'Minha Área',
      description: 'Área pessoal do usuário com favoritos',
      isVisible: true,
      priority: 6
    }
  ]

  for (const page of pages) {
    await prisma.pageVisibility.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        description: page.description,
        priority: page.priority
      },
      create: page
    })
    console.log(`✅ Page visibility for "${page.title}" configured`)
  }

  console.log('🎉 Page visibility seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding page visibility:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 