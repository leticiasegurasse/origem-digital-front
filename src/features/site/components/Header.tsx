import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import CitySelector from './CitySelector';
import logo from '../../../assets/image/logo-roxo-laranja.svg'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuLinks = [
    { to: '#planos', label: 'Planos' },
    { to: '#cobertura', label: 'Cobertura' },
    { to: '#empresas', label: 'Para Empresas' },
    { to: '#suporte', label: 'Suporte' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo Origem Digital" className="h-12" />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <CitySelector />
            {menuLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 font-medium transition-colors hover:[color:var(--color-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <WhatsAppButton
              variant="primary"
              message="Olá! Gostaria de saber mais sobre os planos da Origem Digital."
            >
              <MessageCircle size={20} />
              <span>WhatsApp Suporte</span>
            </WhatsAppButton>
            <Link
              to="/assinar"
              className="text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--color-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
            >
              Assine agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="mb-4">
              <CitySelector />
            </div>
            <nav className="flex flex-col gap-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <WhatsAppButton
                  variant="primary"
                  message="Olá! Gostaria de saber mais sobre os planos da Origem Digital."
                  className="justify-center"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp Vendas</span>
                </WhatsAppButton>
                <Link
                  to="/assinar"
                  className="bg-secondary hover:bg-secondary-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Assine agora
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

