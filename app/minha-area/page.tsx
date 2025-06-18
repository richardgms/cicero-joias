'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Gift, Star, Copy, Calendar, Trophy, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { generatePortfolioSlug } from '@/lib/slug-utils';

interface Coupon {
  id: string;
  code: string;
  type: 'NEW_USER' | 'LOYALTY' | 'PROMOTIONAL';
  value: number;
  percentage?: number;
  maxDiscount?: number;
  expiresAt?: string;
  createdAt: string;
}

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
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserData();
    }
  }, [isLoaded, user]);

  const fetchUserData = async () => {
    try {
      // Buscar cupons
      const couponsResponse = await fetch('/api/coupons');
      if (couponsResponse.ok) {
        const couponsData = await couponsResponse.json();
        setCoupons(couponsData.coupons || []);
      }

      // Buscar favoritos
      const favoritesResponse = await fetch('/api/favorites');
      if (favoritesResponse.ok) {
        const favoritesData = await favoritesResponse.json();
        setFavorites(favoritesData.favorites || []);
      }

      // Buscar pontos de fidelidade
      const loyaltyResponse = await fetch('/api/loyalty/points');
      if (loyaltyResponse.ok) {
        const loyaltyData = await loyaltyResponse.json();
        setLoyaltyPoints(loyaltyData.loyaltyPoints || 0);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código do cupom copiado para a área de transferência",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCouponTypeLabel = (type: string) => {
    switch (type) {
      case 'NEW_USER':
        return 'Novo Cliente';
      case 'LOYALTY':
        return 'Fidelidade';
      case 'PROMOTIONAL':
        return 'Promocional';
      default:
        return type;
    }
  };

  const getCouponDescription = (coupon: Coupon) => {
    if (coupon.type === 'NEW_USER') {
      return `R$ ${coupon.value.toFixed(2)} de desconto`;
    } else if (coupon.type === 'LOYALTY') {
      return `${coupon.percentage}% off (máx. R$ ${coupon.maxDiscount?.toFixed(2)})`;
    }
    return `R$ ${coupon.value.toFixed(2)} de desconto`;
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
    <div className="min-h-screen bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-esmeralda to-ouro rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.firstName?.charAt(0) || user.emailAddresses[0].emailAddress.charAt(0).toUpperCase()}
              </span>
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
          <Tabs defaultValue="cupons" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cupons" className="flex items-center space-x-2">
                <Gift className="w-4 h-4" />
                <span>Cupons</span>
              </TabsTrigger>
              <TabsTrigger value="fidelidade" className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Fidelidade</span>
              </TabsTrigger>
              <TabsTrigger value="favoritos" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Favoritos</span>
              </TabsTrigger>
            </TabsList>

            {/* Cupons */}
            <TabsContent value="cupons" className="space-y-6">
              <div className="grid gap-4">
                {coupons.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Gift className="w-16 h-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Nenhum cupom disponível
                      </h3>
                      <p className="text-gray-500 text-center">
                        Você ainda não possui cupons. Faça seu primeiro pedido e ganhe R$ 10,00 de desconto!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  coupons.map((coupon) => (
                    <motion.div
                      key={coupon.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="overflow-hidden border-2 border-dashed border-esmeralda/30 bg-gradient-to-r from-white to-esmeralda/5">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge variant="secondary" className="bg-esmeralda/10 text-esmeralda">
                                  {getCouponTypeLabel(coupon.type)}
                                </Badge>
                                <Sparkles className="w-4 h-4 text-ouro" />
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {getCouponDescription(coupon)}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {coupon.expiresAt ? `Válido até ${formatDate(coupon.expiresAt)}` : 'Sem expiração'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg font-bold">
                                {coupon.code}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(coupon.code)}
                                className="border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-white"
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copiar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Fidelidade */}
            <TabsContent value="fidelidade" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-ouro" />
                    <span>Programa de Fidelidade</span>
                  </CardTitle>
                  <CardDescription>
                    A cada 10 consertos, você ganha um cupom de 100% de desconto até R$ 40,00!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Pontos atuais:</span>
                      <span className="text-2xl font-bold text-esmeralda">{loyaltyPoints}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progresso para próximo cupom</span>
                        <span>{loyaltyPoints % 10}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-esmeralda to-ouro h-3 rounded-full transition-all duration-500"
                          style={{width: `${(loyaltyPoints % 10) * 10}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-center pt-4">
                      <p className="text-gray-600">
                        Falta{loyaltyPoints % 10 === 0 ? 10 : 10 - (loyaltyPoints % 10)} conserto{loyaltyPoints % 10 === 9 ? '' : 's'} para seu próximo cupom!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
  );
} 