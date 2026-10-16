import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { COMPANY_INFO } from '../utils/company';
import logoLaranjaBranca from '../../../media/image/logo-laranja-branca.svg';
import contratoClientePDF from '../../../media/docs/Contrato-cliente-G2.pdf'; // TODO: renomear arquivo do contrato

const Footer = () => {
  const links = {
    legal: [
      { to: '/termos', label: 'Termos de Uso', isRoute: true },
      { to: '/privacidade', label: 'Política de Privacidade', isRoute: true },
      { to: contratoClientePDF, label: 'Contrato de Prestação de Serviços', isRoute: false, external: true },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://www.facebook.com/origemdigitalsg', label: 'Facebook' },
    { icon: <Instagram size={20} />, url: 'https://www.instagram.com/origemdigitalsg', label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-[var(--color-dark-900)] border-t border-white/5">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent" />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo e Descrição */}
          <div className="text-center md:text-left">
            <img
              src={logoLaranjaBranca}
              alt="Origem Digital"
              className="h-12 mb-4 mx-auto md:mx-0"
            />
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">
              Conectando sua rotina com tecnologia e estabilidade de verdade.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:shadow-[0_0_15px_rgba(235,131,0,0.2)] transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={link.to || index} className="text-center md:text-left">
                  {link.isRoute ? (
                    <Link
                      to={link.to}
                      className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">Telefone</div>
                  <a href={`tel:+${COMPANY_INFO.phone}`} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm">
                    4003-8398
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle size={14} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">WhatsApp</div>
                  <a href={`https://wa.me/${COMPANY_INFO.phone}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm">
                    4003-8398
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={14} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">E-mail</div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm break-all">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Horários */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Horários</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-[var(--color-secondary-light)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-300">Presencial</div>
                  <p className="text-xs text-gray-500">{COMPANY_INFO.businessHours.presencial.days}</p>
                  <p className="text-xs text-gray-500">{COMPANY_INFO.businessHours.presencial.hours}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-[var(--color-secondary-light)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-300">Online</div>
                  <p className="text-xs text-gray-500">{COMPANY_INFO.businessHours.online.days}</p>
                  <p className="text-xs text-gray-500">{COMPANY_INFO.businessHours.online.hours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 text-center md:text-left">
            <div>
              <p>
                &copy; {new Date().getFullYear()} {COMPANY_INFO.legalName} - Origem Digital. Todos os direitos reservados.
              </p>
              <p className="mt-1">CNPJ: {COMPANY_INFO.cnpj}</p>
            </div>
            <div className="md:text-right">
              <p>Provedor de Internet - Serviço de Comunicação Multimídia (SCM)</p>
              <p className="mt-1">Autorizado e regulamentado pela Anatel</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
