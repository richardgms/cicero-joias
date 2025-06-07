import React from 'react';
import Link from 'next/link';
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
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-playfair text-lg font-bold">Cícero Joias</h3>
                <p className="text-sm text-slate-400">Tradição que se renova</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Há mais de 40 anos criando momentos especiais através de joias únicas e serviços de qualidade excepcional.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="#" 
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5583988073784" 
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/orcamento?tipo=alianças" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Alianças de Casamento
                </Link>
              </li>
              <li>
                <Link href="/orcamento?tipo=consertos" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Consertos de Joias
                </Link>
              </li>
              <li>
                <Link href="/orcamento?tipo=banho-ouro" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Banho de Ouro
                </Link>
              </li>
              <li>
                <Link href="/orcamento?tipo=anel-formatura" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Anéis de Formatura
                </Link>
              </li>
              <li>
                <Link href="/orcamento?tipo=joia-personalizada" className="text-slate-400 hover:text-white transition-colors text-sm">
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
                <Link href="/sobre" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="/pronta-entrega" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Pronta Entrega
                </Link>
              </li>
              <li>
                <Link href="/cliente" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Portal do Cliente
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-slate-400 hover:text-white transition-colors text-sm">
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
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400">
                    Rua das Flores, 123<br />
                    Centro, João Pessoa - PB<br />
                    CEP: 58010-000
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <p className="text-sm text-slate-400">(83) 98807-3784</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <p className="text-sm text-slate-400">contato@cicerojoias.com.br</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400">
                    Seg - Sex: 8h às 18h<br />
                    Sáb: 8h às 16h<br />
                    Dom: Fechado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Cícero Joias. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/termos-uso" className="text-slate-400 hover:text-white transition-colors text-sm">
                Termos de Uso
              </Link>
              <Link href="/politica-privacidade" className="text-slate-400 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}