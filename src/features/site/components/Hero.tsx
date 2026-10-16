import { MessageCircle, ChevronDown } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import mascoteImage from '../../../media/image/mascote-hero.png';

interface HeroProps {
  onCheckCoverage?: (cep: string) => void;
}

const Hero = ({ onCheckCoverage: _onCheckCoverage }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-dark-900)] pt-20">
      {/* Static grid - subtle base lines always visible */}
      <div className="absolute inset-0 bg-tech-grid opacity-40" />

      {/* Orange light sweeping down - visible only through grid lines (desktop only) */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, transparent 30%, rgba(160, 32, 240, 0.1) 45%, rgba(160, 32, 240, 0.3) 50%, rgba(160, 32, 240, 0.1) 55%, transparent 70%, transparent 100%)',
          backgroundSize: '100% 200%',
          animation: 'grid-light-down 5s ease-in-out infinite',
          WebkitMaskImage: `
            repeating-linear-gradient(0deg, transparent, transparent 59px, white 59px, white 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, white 59px, white 60px)
          `,
          WebkitMaskSize: '60px 60px',
          WebkitMaskComposite: 'source-over',
          maskImage: `
            repeating-linear-gradient(0deg, transparent, transparent 59px, white 59px, white 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, white 59px, white 60px)
          `,
          maskSize: '60px 60px',
          maskComposite: 'add',
        }}
      />

      {/* Radial glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[var(--color-primary)] rounded-full blur-[80px] sm:blur-[200px] opacity-[0.07]" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-[var(--color-secondary)] rounded-full blur-[80px] sm:blur-[180px] opacity-[0.08]" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text - Left */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left py-12 lg:py-0">
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-7 leading-[1.1] animate-fade-in-up delay-100">
                <span className="text-gradient-primary">Internet de verdade</span>
                <br />
                <span className="text-white">com fibra óptica</span>
                <br />
                <span className="text-gradient-mixed">até sua casa.</span>
              </h1>

              {/* Sub */}
              <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 text-gray-400 leading-relaxed max-w-xl animate-fade-in-up delay-200">
                Internet de alta velocidade com fibra óptica 100% até sua casa. Tecnologia, estabilidade e suporte local.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
                <a
                  href="#planos"
                  className="group relative bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 text-base sm:text-lg text-center hover:shadow-[0_0_30px_rgba(235,131,0,0.4)] hover:scale-[1.02]"
                >
                  Ver planos na minha cidade
                </a>
                <WhatsAppButton
                  variant="outline"
                  message="Olá! Gostaria de falar com um especialista sobre os planos da Origem Digital."
                  className="border-2 border-gray-600 text-gray-300 hover:border-[var(--color-primary)] hover:text-white text-base sm:text-lg justify-center rounded-xl backdrop-blur-sm"
                  utm={{ source: 'hero', medium: 'website', campaign: 'especialista' }}
                >
                  <MessageCircle size={20} className="sm:w-6 sm:h-6" />
                  <span>Falar com especialista</span>
                </WhatsAppButton>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mt-8 sm:mt-10 animate-fade-in-up delay-400">
                <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <span>100% Fibra óptica</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <span>Instalação grátis*</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <span>Wi-Fi 6</span>
                </div>
              </div>
            </div>

            {/* Mascot Image - Right */}
            <div className="hidden lg:flex lg:w-1/2 justify-center relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/10 to-transparent rounded-3xl blur-3xl" />
              <div className="relative">
                <img
                  src={mascoteImage}
                  alt="Mascote Origem Digital"
                  className="w-full object-cover rounded-3xl shadow-2xl animate-fade-in-up delay-200"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float hidden sm:flex">
        <a href="#beneficios" className="flex flex-col items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors">
          <span className="text-xs uppercase tracking-widest">Descubra</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
