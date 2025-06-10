import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Gem, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-esmeralda text-marfim relative overflow-hidden">
      {/* Background decorativo com shine elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Image
            src="/assets/brand/shine.png"
            alt=""
            width={24}
            height={24}
            className="animate-pulse"
          />
        </div>
        <div className="absolute top-20 right-20">
          <Image
            src="/assets/brand/shine.png"
            alt=""
            width={16}
            height={16}
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>
        <div className="absolute bottom-16 left-1/3">
          <Image
            src="/assets/brand/shine.png"
            alt=""
            width={20}
            height={20}
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="relative">
                <Image
                  src="/assets/logos/no-background/white-monogram.png"
                  alt="Cícero Joias - Monograma"
                  width={32}
                  height={32}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                {/* Shine effect decorativo */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src="/assets/brand/shine.png"
                    alt=""
                    width={10}
                    height={10}
                    className="animate-pulse"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-playfair text-lg font-bold group-hover:text-ouro transition-colors duration-300">Cícero Joias</h3>
                <div className="flex items-center space-x-1">
                  <p className="text-sm text-marfim-dark">Tradição que se renova</p>
                  <Image
                    src="/assets/brand/shine.png"
                    alt=""
                    width={8}
                    height={8}
                    className="animate-pulse opacity-50"
                  />
                </div>
              </div>
            </div>
            <p className="text-marfim-dark text-sm leading-relaxed">
              Há mais de 40 anos criando momentos especiais através de joias únicas e serviços de qualidade excepcional.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="#" 
                className="text-marfim-dark hover:text-ouro transition-colors duration-300 hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-marfim-dark hover:text-ouro transition-colors duration-300 hover:scale-110 transform"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5583988073784" 
                className="text-marfim-dark hover:text-ouro transition-colors duration-300 hover:scale-110 transform"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="font-semibold text-lg">Serviços</h3>
              <Image
                src="/assets/brand/shine.png"
                alt=""
                width={12}
                height={12}
                className="animate-pulse opacity-70"
              />
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/orcamento?tipo=alianças" className="text-marfim-dark hover:text-ouro transition-colors text-sm flex items-center group">
                  <span>Alianças de Casamento</span>
                  <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src="/assets/brand/shine.png"
                      alt=""
                      width={8}
                      height={8}
                    />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/orcamento?tipo=consertos" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Consertos de Joias
                </Link>
              </li>
              <li>
                <Link href="/orcamento?tipo=banho-ouro" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Banho de Ouro
                </Link>
              </li>
              <li>
                <Link href="/orcamento?tipo=anel-formatura" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Anéis de Formatura
                </Link>
              </li>
              <li>
                <Link href="/orcamento?tipo=joia-personalizada" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Joias Personalizadas
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="/pronta-entrega" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Pronta Entrega
                </Link>
              </li>
              <li>
                <Link href="/cliente" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Portal do Cliente
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-ouro mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-marfim-dark">
                    Galeria Jardim - R. Duque de Caxias, 516<br />
                    Centro, João Pessoa - PB<br />
                    CEP: 58010-821
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-ouro flex-shrink-0" />
                <p className="text-sm text-marfim-dark">(83) 98807-3784</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ouro flex-shrink-0" />
                <p className="text-sm text-marfim-dark">contato@cicerojoias.com.br</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-ouro mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-marfim-dark">
                    Seg - Sex: 10h às 17h<br />
                    Sáb: 10h às 14h<br />
                    Dom: Fechado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-esmeralda-dark mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <p className="text-marfim-dark text-sm">
                © {new Date().getFullYear()} Cícero Joias. Todos os direitos reservados.
              </p>
              <Image
                src="/assets/brand/shine.png"
                alt=""
                width={8}
                height={8}
                className="animate-pulse opacity-40"
              />
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/termos-uso" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                Termos de Uso
              </Link>
              <Link href="/politica-privacidade" className="text-marfim-dark hover:text-ouro transition-colors text-sm">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}