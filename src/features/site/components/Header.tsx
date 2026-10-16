import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import CitySelector from './CitySelector';
import logo from '../../../media/image/logo-laranja-branca.svg';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const menuLinks = [
    { to: '#planos', label: 'Planos' },
    { to: '/cobertura', label: 'Cobertura' },
    { to: '#empresas', label: 'Para Empresas' },
    { to: '#suporte', label: 'Suporte' },
    { to: '/ajuda', label: 'Ajuda' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        mobileMenuOpen
          ? 'bg-[var(--color-dark-900)] lg:bg-transparent'
          : scrolled
            ? 'bg-[var(--color-dark-900)]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5'
            : 'bg-transparent'
      } ${mobileMenuOpen ? 'h-screen lg:h-auto' : ''}`}
    >
      <div className={`container mx-auto px-4 ${mobileMenuOpen ? 'flex flex-col h-full lg:block lg:h-auto' : ''}`}>
        <div className="flex items-center justify-between h-20 flex-shrink-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 relative group">
            <img src={logo} alt="Logo Origem Digital" className="h-10 transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <CitySelector />
            {menuLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-gray-400 font-medium transition-all duration-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <WhatsAppButton
              variant="outline"
              message="Olá! Gostaria de saber mais sobre os planos da Origem Digital."
              className="border border-gray-700 text-gray-300 hover:border-[var(--color-primary)] hover:text-white text-sm py-2.5 px-4 rounded-lg"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </WhatsAppButton>
            <Link
              to="/assinar"
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(235,131,0,0.3)] hover:scale-[1.02] text-sm"
            >
              Assine agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Mobile - Fullscreen */}
        {mobileMenuOpen && (
          <div className="lg:hidden flex flex-col flex-1 min-h-0 animate-fade-in-up border-t border-white/10">
            {/* City selector */}
            <div className="px-4 py-4">
              <CitySelector />
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-2 py-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center text-gray-300 hover:text-white font-semibold transition-all py-4 px-4 rounded-xl hover:bg-white/5 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTAs - Fixed at bottom */}
            <div className="px-4 pb-8 pt-4 border-t border-white/10 flex flex-col gap-3">
              <WhatsAppButton
                variant="primary"
                message="Olá! Gostaria de saber mais sobre os planos da Origem Digital."
                className="justify-center rounded-xl py-4 text-base"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Vendas</span>
              </WhatsAppButton>
              <Link
                to="/assinar"
                className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-light)] text-white font-semibold py-4 rounded-xl transition-all text-center text-base hover:shadow-[0_0_20px_rgba(69,36,131,0.3)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Assine agora
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
