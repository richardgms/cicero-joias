'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { generatePortfolioSlug } from '@/lib/slug-utils';
import { PageVisibilityGuard } from '@/components/page-visibility-guard';

interface Favorite {
  id: string;
  portfolioItem: {
    id: string;
    title: string;
    description?: string;
    category: string;
    mainImage: string;
  };
  createdAt: string;
}

const categoryLabels = {
  WEDDING_RINGS: 'Alianças',
  REPAIRS_BEFORE_AFTER: 'Consertos',
  GOLD_PLATING: 'Banho de Ouro',
  CUSTOM_JEWELRY: 'Joias Personalizadas',
  GRADUATION_RINGS: 'Anéis de Formatura'
};

export default function MinhaAreaPage() {
  const { user, isLoaded } = useUser();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserData();
    }
  }, [isLoaded, user]);

  const fetchUserData = async () => {
    try {
      // Buscar favoritos
      const favoritesResponse = await fetch('/api/favorites');
      if (favoritesResponse.ok) {
        const favoritesData = await favoritesResponse.json();
        setFavorites(favoritesData.favorites || []);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-esmeralda mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando sua área...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h1>
          <p className="text-gray-600 mb-8">
            Você precisa estar logado para acessar sua área pessoal.
          </p>
          <Button asChild className="bg-esmeralda text-marfim hover:bg-esmeralda-dark">
            <Link href="/sign-in">
              Fazer Login
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <PageVisibilityGuard pageSlug="minha-area">
      <div className="min-h-screen bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-esmeralda to-ouro rounded-full flex items-center justify-center overflow-hidden">
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.firstName || 'Usuário'}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {user.firstName?.charAt(0) || user.emailAddresses[0].emailAddress.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Olá, {user.firstName || 'Cliente'}!
                </h1>
                <p className="text-gray-600">
                  Bem-vindo à sua área pessoal
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="favoritos" className="space-y-6">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="favoritos" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Favoritos</span>
                </TabsTrigger>
              </TabsList>

              {/* Favoritos */}
              <TabsContent value="favoritos" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {favorites.length === 0 ? (
                    <div className="col-span-full">
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Heart className="w-16 h-16 text-gray-300 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Nenhum favorito ainda
                          </h3>
                          <p className="text-gray-500 text-center">
                            Explore nosso portfólio e marque os projetos que mais gostou com o coração ❤️
                          </p>
                          <Button asChild className="mt-4 bg-esmeralda text-marfim hover:bg-esmeralda-dark">
                            <Link href="/portfolio">
                              Ver Portfólio
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    favorites.map((favorite) => (
                      <motion.div
                        key={favorite.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={`/portfolio/${generatePortfolioSlug({
                          title: favorite.portfolioItem.title,
                          category: favorite.portfolioItem.category,
                          id: favorite.portfolioItem.id
                        })}`}>
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="relative h-48">
                              <Image
                                src={favorite.portfolioItem.mainImage}
                                alt={favorite.portfolioItem.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <Badge variant="outline" className="mb-2">
                                {categoryLabels[favorite.portfolioItem.category as keyof typeof categoryLabels] || favorite.portfolioItem.category}
                              </Badge>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {favorite.portfolioItem.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {favorite.portfolioItem.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  Favoritado em {formatDate(favorite.createdAt)}
                                </span>
                                <span className="text-xs text-esmeralda font-medium">
                                  Ver Projeto →
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </PageVisibilityGuard>
  );
}