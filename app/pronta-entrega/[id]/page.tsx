import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { checkPageVisibility } from '@/lib/page-visibility';
import { ProductDetail } from './product-detail';
import { FinalCTASection } from '@/components/home/final-cta-section';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  const product = await prisma.product.findFirst({
    where: {
      id,
      isActive: true,
    },
  });

  if (!product) return null;

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      mainImage: true,
      category: true,
      price: true,
    },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return { product, relatedProducts };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getProduct(id);

  if (!data) {
    return {
      title: 'Produto não encontrado - Cícero Joias',
    };
  }

  const { product } = data;

  return {
    title: product.seoTitle || `${product.name} - Cícero Joias`,
    description:
      product.seoDescription ||
      product.description ||
      `Conheça ${product.name}, disponível para pronta entrega na Cícero Joias.`,
    openGraph: {
      title: product.seoTitle || product.name,
      description:
        product.seoDescription ||
        product.description ||
        `Conheça ${product.name}, disponível para pronta entrega na Cícero Joias.`,
      images: product.mainImage ? [product.mainImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  // Server-side visibility check (redirects if hidden, unless admin)
  await checkPageVisibility('pronta-entrega');

  const data = await getProduct(id);

  if (!data) {
    notFound();
  }

  const { product, relatedProducts } = data;

  const serializedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price ?? 0),
    promotionalPrice: product.promotionalPrice ? Number(product.promotionalPrice) : null,
    category: product.category as string,
    mainImage: product.mainImage,
    images: product.images as string[],
    stock: product.stock,
    weight: product.weight ? Number(product.weight) : null,
    material: product.material,
    size: product.size,
    code: product.code,
    deliveryTime: product.deliveryTime,
    createdAt: product.createdAt.toISOString(),
  };

  return (
    <>
      <ProductDetail
        product={serializedProduct}
        relatedProducts={relatedProducts.map((p) => ({
          id: p.id,
          name: p.name,
          mainImage: p.mainImage,
          category: p.category as string,
          price: Number(p.price ?? 0),
        }))}
      />
      <FinalCTASection appearance="home-dark" />
    </>
  );
}
