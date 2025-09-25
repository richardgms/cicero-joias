'use client';







import React, { useEffect, useMemo, useState } from 'react';







import Link from 'next/link';







import Image from 'next/image';







import { ChevronLeft, ArrowLeft, ArrowRight, ExternalLink, ZoomIn, Share2, Heart, ChevronRight } from 'lucide-react';







import { useUser } from '@clerk/nextjs';







import { Button } from '@/components/ui/button';







import { useParams } from 'next/navigation';







import { generatePortfolioSlug } from '@/lib/slug-utils';







import { motion, AnimatePresence } from 'framer-motion';







// Mapeamento de categorias para exibição







const categoryLabels = {







WEDDING_RINGS: 'Alianças de Casamento',







REPAIRS_BEFORE_AFTER: 'Consertos (Antes/Depois)',







GOLD_PLATING: 'Banho de Ouro',







CUSTOM_JEWELRY: 'Joias Personalizadas',







GRADUATION_RINGS: 'Anéis de Formatura',







};







interface PortfolioItem {







id: string;







title: string;







description?: string;







detailedDescription?: string;







category: string;







mainImage: string;







images: string[];







specifications?: Record<string, string>;







seoTitle?: string;







seoDescription?: string;







keywords?: string[];







createdAt: string;







product?: {







id: string;







name: string;







price: number;







};







}







interface RelatedProject {







id: string;







title: string;







mainImage: string;







category: string;







description?: string;







}







interface ApiResponse {







portfolioItem: PortfolioItem;







relatedProjects: RelatedProject[];







}







interface FavoriteResponse {







favorites?: Array<{ portfolioItem: { id: string } }>;







}







export default function PortfolioItemPage() {







const params = useParams();







const slug = params?.slug as string;







const { isSignedIn, isLoaded } = useUser();







const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | null>(null);







const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);







const [loading, setLoading] = useState(true);







const [error, setError] = useState<string | null>(null);







const [selectedImageIndex, setSelectedImageIndex] = useState(0);







const [isImageModalOpen, setIsImageModalOpen] = useState(false);







const [isFavorited, setIsFavorited] = useState(false);







const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);







useEffect(() => {







if (!slug) {







return;







}







let isMounted = true;







const loadPortfolioItem = async () => {







setLoading(true);







setError(null);







try {







const response = await fetch(`/api/portfolio/by-slug/${slug}`);







if (!isMounted) {







return;







}







if (!response.ok) {







setError(response.status === 404 ? 'Projeto n?o encontrado' : 'Erro ao carregar projeto');







return;







}







const data: ApiResponse = await response.json();







setPortfolioItem(data.portfolioItem);







setRelatedProjects(data.relatedProjects);







if (typeof document !== 'undefined') {







document.title = data.portfolioItem.seoTitle || `${data.portfolioItem.title} - C?cero Joias`;







const metaDescription = document.querySelector('meta[name="description"]');







if (metaDescription) {







metaDescription.setAttribute(







'content',







data.portfolioItem.seoDescription ||







data.portfolioItem.description ||







`Conhe?a o projeto ${data.portfolioItem.title} da C?cero Joias`







);







}







}







} catch (fetchError) {







if (isMounted) {







console.error('Erro ao buscar projeto:', fetchError);







setError('Erro ao carregar projeto');







}







} finally {







if (isMounted) {







setLoading(false);







}







}







};







void loadPortfolioItem();







return () => {







isMounted = false;







};







}, [slug]);







useEffect(() => {







if (!portfolioItem || !isLoaded) {







return;







}







if (!isSignedIn) {







setIsFavorited(false);







return;







}







let isMounted = true;







const loadFavoriteState = async () => {







try {







const response = await fetch('/api/favorites');







if (!isMounted) {







return;







}







if (response.ok) {







const data: FavoriteResponse = await response.json();







const isFav = data.favorites?.some((fav) => fav.portfolioItem.id === portfolioItem.id) ?? false;







setIsFavorited(isFav);







} else if (response.status === 401) {







setIsFavorited(false);







}







} catch (favoriteError) {







if (isMounted) {







console.error('Erro ao verificar favorito:', favoriteError);







setIsFavorited(false);







}







}







};







void loadFavoriteState();







return () => {







isMounted = false;







};







}, [isLoaded, isSignedIn, portfolioItem]);







const handleShare = async () => {







if (!portfolioItem) {







return;







}







const currentUrl = typeof window !== 'undefined' ? window.location.href : '';







if (navigator.share && currentUrl) {







try {







await navigator.share({







title: portfolioItem.title,







text:







portfolioItem.description ||







`Confira este projeto da Cicero Joias: ${portfolioItem.title}`,







url: currentUrl,







});







return;







} catch (shareError) {







console.error('Erro ao compartilhar projeto:', shareError);







}







}







await copyToClipboard(currentUrl);







};







const copyToClipboard = async (url: string) => {







if (!url || typeof navigator === 'undefined') {







return;







}







try {







if (navigator.clipboard?.writeText) {







await navigator.clipboard.writeText(url);







return;







}







if (typeof document !== 'undefined') {







const textArea = document.createElement('textarea');







textArea.value = url;







textArea.setAttribute('readonly', '');







textArea.style.position = 'absolute';







textArea.style.left = '-9999px';







document.body.appendChild(textArea);







textArea.select();







document.execCommand('copy');







document.body.removeChild(textArea);







}







} catch (clipboardError) {







console.error('Erro ao copiar link:', clipboardError);







}







};







const toggleFavorite = async () => {







if (!portfolioItem || isTogglingFavorite) {







return;







}







if (!isSignedIn) {







window.location.href = '/sign-in';







return;







}







setIsTogglingFavorite(true);







try {







const response = await fetch('/api/favorites/toggle', {







method: 'POST',







headers: {







'Content-Type': 'application/json',







},







body: JSON.stringify({ portfolioItemId: portfolioItem.id }),







});







if (response.ok) {







const data = await response.json();







setIsFavorited(Boolean(data.isFavorited));







} else if (response.status === 401) {







window.location.href = '/sign-in';







} else {







console.error('Erro na resposta:', response.status);







}







} catch (toggleError) {







console.error('Erro ao alterar favorito:', toggleError);







} finally {







setIsTogglingFavorite(false);







}







};







const allImages = useMemo(() => {

  if (!portfolioItem) {

    return [];

  }



  const images = [portfolioItem.mainImage, ...portfolioItem.images].filter(

    (image): image is string => Boolean(image)

  );



  return images.length > 0 ? images : ['/assets/images/home-hero.jpg'];

}, [portfolioItem]);



useEffect(() => {

  if (selectedImageIndex >= allImages.length) {

    setSelectedImageIndex(0);

  }

}, [allImages.length, selectedImageIndex]);



if (loading) {







return (







<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">







<motion.div 







initial={{ opacity: 0 }}







animate={{ opacity: 1 }}







className="text-center"







>







<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-esmeralda mx-auto mb-4"></div>







<p className="text-esmeralda/70">Carregando projeto...</p>







</motion.div>







</div>







);







}







if (error || !portfolioItem) {







return (







<motion.div 







initial={{ opacity: 0 }}







animate={{ opacity: 1 }}







className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5"







>







<div className="text-center max-w-md mx-auto">







<motion.div 







initial={{ scale: 0 }}







animate={{ scale: 1 }}







transition={{ delay: 0.2 }}







className="text-6xl mb-4"







>







💎







</motion.div>







<h1 className="text-2xl font-bold text-esmeralda mb-4">Projeto não encontrado</h1>







<p className="text-esmeralda/70 mb-8">







O projeto que você está procurando não existe ou foi removido.







</p>







<Button asChild className="bg-esmeralda text-marfim hover:bg-esmeralda-dark">







<Link href="/portfolio">







<ArrowLeft className="h-4 w-4 mr-2" />







Voltar ao Portfólio







</Link>







</Button>







</div>







</motion.div>







);







}







const generateSlugForProject = (project: RelatedProject) => {







return generatePortfolioSlug({







title: project.title,







category: project.category,







id: project.id







});







};







const nextImage = () => {







setSelectedImageIndex((prev) => (prev + 1) % allImages.length);







};







const prevImage = () => {







setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);







};







return (







<div className="min-h-screen bg-marfim">







{/* Navegação Breadcrumb Melhorada */}







<div className="bg-white/90 backdrop-blur-sm border-b border-esmeralda/10 sticky top-0 z-40">







<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">







<div className="flex items-center justify-between">







<div className="flex items-center space-x-4">







<Button variant="ghost" asChild className="text-esmeralda hover:text-ouro hover:bg-esmeralda/10">







<Link href="/portfolio">







<ArrowLeft className="h-4 w-4 mr-2" />







Voltar ao Portfólio







</Link>







</Button>







{/* Breadcrumb melhorado */}







<nav className="hidden md:flex text-sm text-esmeralda/80">







<Link href="/" className="hover:text-esmeralda transition-colors">Início</Link>







<ChevronRight className="h-4 w-4 mx-1 text-esmeralda/40" />







<Link href="/portfolio" className="hover:text-esmeralda transition-colors">Portfólio</Link>







<ChevronRight className="h-4 w-4 mx-1 text-esmeralda/40" />







<span className="text-esmeralda font-medium">







{categoryLabels[portfolioItem.category as keyof typeof categoryLabels] || portfolioItem.category}







</span>







<ChevronRight className="h-4 w-4 mx-1 text-esmeralda/40" />







<span className="text-esmeralda font-medium truncate max-w-xs">{portfolioItem.title}</span>







</nav>







</div>







{/* Ações */}







<div className="flex items-center space-x-2" aria-label="A��es do projeto">







<Button







variant="ghost"







size="sm"







onClick={toggleFavorite}







disabled={isTogglingFavorite}







className="text-esmeralda/80 hover:text-ouro disabled:opacity-50"







title={isSignedIn ? (isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos') : 'Faça login para favoritar'}







>







<Heart 







className={`h-4 w-4 transition-all duration-200 ${isTogglingFavorite ? 'animate-pulse' : ''}`}







style={{







fill: isFavorited ? '#C79A34' : 'none',







stroke: isFavorited ? '#C79A34' : 'currentColor',







color: isFavorited ? '#C79A34' : 'inherit'







}}







/>







</Button>







<Button







variant="ghost"







size="sm"







onClick={handleShare}







className="text-esmeralda/80 hover:text-ouro"







>







<Share2 className="h-4 w-4" />







</Button>







</div>







</div>







</div>







</div>







{/* Hero Section */}







<motion.section 







initial={{ opacity: 0 }}







animate={{ opacity: 1 }}







transition={{ duration: 0.8 }}







className="py-12 lg:py-16"







>







<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">







<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">







{/* Galeria de Imagens Moderna */}







<motion.div 







initial={{ opacity: 0, x: -50 }}







animate={{ opacity: 1, x: 0 }}







transition={{ duration: 0.8, delay: 0.2 }}







className="space-y-4"







>







{/* Imagem Principal */}







<div className="relative group">







<div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-white shadow-2xl border-4 border-white">







<Image







src={allImages[selectedImageIndex]}







alt={portfolioItem.title}







fill







className="object-contain transition-transform duration-500 group-hover:scale-105"







sizes="(max-width: 768px) 100vw, 50vw"







onError={(e) => {







const target = e.target as HTMLImageElement;







target.src = '/assets/images/home-hero.jpg';







}}







/>







{/* Overlay com controles */}







<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">







{/* Botão de zoom */}







<button







onClick={() => setIsImageModalOpen(true)}







className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-esmeralda p-2 rounded-full shadow-lg hover:bg-white transition-colors"







>







<ZoomIn className="h-5 w-5" />







</button>







{/* Navegação de imagens */}







{allImages.length > 1 && (







<>







<button







onClick={prevImage}







className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-esmeralda p-2 rounded-full shadow-lg hover:bg-white transition-colors"







>







<ArrowLeft className="h-5 w-5" />







</button>







<button







onClick={nextImage}







className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-esmeralda p-2 rounded-full shadow-lg hover:bg-white transition-colors"







>







<ArrowRight className="h-5 w-5" />







</button>







</>







)}







</div>







{/* Indicador de posição */}







{allImages.length > 1 && (







<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">







{allImages.map((_, index) => (







<button







key={index}







onClick={() => setSelectedImageIndex(index)}







className={`w-2 h-2 rounded-full transition-all ${







index === selectedImageIndex 







? 'bg-ouro w-6' 







: 'bg-white/60 hover:bg-white/80'







}`}







/>







))}







</div>







)}







</div>







</div>







{/* Thumbnails */}







{allImages.length > 1 && (







<motion.div 







initial={{ opacity: 0, y: 20 }}







animate={{ opacity: 1, y: 0 }}







transition={{ duration: 0.6, delay: 0.4 }}







className="grid grid-cols-4 gap-3"







>







{allImages.map((image, index) => (







<button 







key={index} 







onClick={() => setSelectedImageIndex(index)}







className={`relative h-20 md:h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 ${







selectedImageIndex === index 







? 'border-ouro shadow-lg scale-105 ring-2 ring-ouro/30' 







: 'border-white hover:border-esmeralda hover:shadow-md'







}`}







>







<Image







src={image}







alt={`${portfolioItem.title} - Imagem ${index + 1}`}







fill







className="object-cover"







sizes="100px"







onError={(e) => {







const target = e.target as HTMLImageElement;







target.src = '/assets/images/home-hero.jpg';







}}







/>







</button>







))}







</motion.div>







)}







</motion.div>







{/* Informações do Projeto */}







<motion.div 







initial={{ opacity: 0, x: 50 }}







animate={{ opacity: 1, x: 0 }}







transition={{ duration: 0.8, delay: 0.4 }}







className="space-y-6 lg:pl-8"







>







{/* Categoria */}







<div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-esmeralda/10 to-ouro/10 text-esmeralda text-sm font-medium border border-esmeralda/20">







{categoryLabels[portfolioItem.category as keyof typeof categoryLabels] || portfolioItem.category}







</div>







{/* Título */}







<h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-esmeralda leading-tight">







{portfolioItem.title}







</h1>







{/* Data */}







<p className="text-sm text-esmeralda/60">







Criado em {new Date(portfolioItem.createdAt).toLocaleDateString('pt-BR', { 







year: 'numeric', 







month: 'long', 







day: 'numeric' 







})}







</p>







{/* Descrição */}







{portfolioItem.description && (







<p className="text-lg text-grafite/80 leading-relaxed">







{portfolioItem.description}







</p>







)}







{/* Descrição Detalhada */}







{portfolioItem.detailedDescription && (







<div className="prose prose-gray max-w-none">







<p className="text-grafite/70 leading-relaxed">







{portfolioItem.detailedDescription}







</p>







</div>







)}







{/* Especificações */}







{portfolioItem.specifications && Object.keys(portfolioItem.specifications).length > 0 && (







<motion.div 







initial={{ opacity: 0, y: 20 }}







animate={{ opacity: 1, y: 0 }}







transition={{ duration: 0.6, delay: 0.6 }}







className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm"







>







<h3 className="font-semibold text-esmeralda mb-4 flex items-center">







<span className="w-2 h-2 bg-ouro rounded-full mr-2"></span>







Especificações Técnicas







</h3>







<dl className="grid grid-cols-1 gap-3">







{Object.entries(portfolioItem.specifications).map(([key, value]) => (







<div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">







<dt className="text-esmeralda/70 font-medium">{key}:</dt>







<dd className="text-esmeralda font-medium">{value}</dd>







</div>







))}







</dl>







</motion.div>







)}







{/* CTA */}







<motion.div 







initial={{ opacity: 0, y: 20 }}







animate={{ opacity: 1, y: 0 }}







transition={{ duration: 0.6, delay: 0.8 }}







className="space-y-4 pt-6"







>







<Button asChild size="lg" className="w-full bg-gradient-to-r from-ouro to-yellow-400 text-grafite hover:from-yellow-400 hover:to-ouro shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">







<Link href="/orcamento">







Solicitar Orçamento Similar







<ExternalLink className="h-4 w-4 ml-2" />







</Link>







</Button>







<p className="text-sm text-esmeralda/60 text-center">







Criamos joias personalizadas com base em nossos projetos







</p>







</motion.div>







</motion.div>







</div>







</div>







</motion.section>







{/* Projetos Relacionados */}







{relatedProjects.length > 0 && (







<motion.section 







initial={{ opacity: 0, y: 50 }}







animate={{ opacity: 1, y: 0 }}







transition={{ duration: 0.8, delay: 0.6 }}







className="py-16 bg-white/40 backdrop-blur-sm"







>







<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">







<h2 className="font-playfair text-2xl md:text-3xl font-bold text-esmeralda mb-8 text-center">







Projetos Relacionados







</h2>







<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">







{relatedProjects.map((project, index) => (







<motion.div







key={project.id}







initial={{ opacity: 0, y: 20 }}







animate={{ opacity: 1, y: 0 }}







transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}







>







<Link 







href={`/portfolio/${generateSlugForProject(project)}`}







className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 block"







>







<div className="relative h-48">







<Image







src={project.mainImage}







alt={project.title}







fill







className="object-cover group-hover:scale-110 transition-transform duration-500"







sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"







onError={(e) => {







const target = e.target as HTMLImageElement;







target.src = '/assets/images/home-hero.jpg';







}}







/>







<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />







</div>







<div className="p-4">







<div className="text-xs text-esmeralda font-medium mb-2 uppercase tracking-wide">







{categoryLabels[project.category as keyof typeof categoryLabels] || project.category}







</div>







<h3 className="font-semibold text-esmeralda group-hover:text-esmeralda transition-colors line-clamp-2 mb-2">







{project.title}







</h3>







{project.description && (







<p className="text-xs text-esmeralda/70 line-clamp-2">







{project.description}







</p>







)}







</div>







</Link>







</motion.div>







))}







</div>







</div>







</motion.section>







)}







{/* Modal de Imagem em Tela Cheia */}







<AnimatePresence>







{isImageModalOpen && (







<motion.div 







initial={{ opacity: 0 }}







animate={{ opacity: 1 }}







exit={{ opacity: 0 }}







className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"







onClick={() => setIsImageModalOpen(false)}







>







<motion.div 







initial={{ scale: 0.9 }}







animate={{ scale: 1 }}







exit={{ scale: 0.9 }}







className="relative max-w-5xl max-h-[90vh] w-full h-full"







onClick={(e: React.MouseEvent) => e.stopPropagation()}







>







<button







onClick={() => setIsImageModalOpen(false)}







className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors z-10"







>







<ArrowLeft className="h-6 w-6" />







</button>







<Image







src={allImages[selectedImageIndex]}







alt={portfolioItem.title}







fill







className="object-contain"







sizes="100vw"







/>







{allImages.length > 1 && (







<>







<button







onClick={prevImage}







className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"







>







<ArrowLeft className="h-6 w-6" />







</button>







<button







onClick={nextImage}







className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"







>







<ArrowRight className="h-6 w-6" />







</button>







</>







)}







</motion.div>







</motion.div>







)}







</AnimatePresence>







</div>







);







} 
