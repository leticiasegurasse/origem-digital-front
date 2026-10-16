import type { ReactNode } from 'react';
import imgLogin from '../../../media/image/central-login.png';
import imgSenha from '../../../media/image/central-senha.png';
import imgFaturas from '../../../media/image/central-faturas.png';
import imgServicos from '../../../media/image/central-servicos.png';
import imgAtendimentos from '../../../media/image/central-atendimentos.png';
import imgMeusDados from '../../../media/image/central-meus-dados.png';
import { Link } from 'react-router-dom';
import {
  LogIn,
  Receipt,
  Package,
  Headphones,
  UserCheck,
  ChevronRight,
  MessageCircle,
  Camera,
  Phone,
  Mail,
  ArrowLeft,
  Info,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import WhatsAppButton from '../components/WhatsAppButton';
import { COMPANY_INFO } from '../utils/company';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StepImage {
  desktopSrc?: string;
  mobileSrc?: string;
  alt: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Inline badge for UI element names (menu options, buttons, etc.)
 */
const UiLabel = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-white text-xs font-semibold font-mono">
    {children}
  </span>
);

/**
 * Placeholder shown when a tutorial screenshot is not yet available.
 * Preserves layout space so the page looks consistent once images are added.
 */
const ImagePlaceholder = ({ alt }: { alt: string }) => (
  <div
    className="w-full rounded-xl border-2 border-dashed border-[var(--color-primary)]/20 bg-white/[0.025] flex flex-col items-center justify-center gap-3 py-10 px-6 select-none"
    role="img"
    aria-label={alt}
    style={{ minHeight: '200px' }}
  >
    <Camera size={32} className="text-[var(--color-primary)]/25" aria-hidden="true" />
    <p className="text-xs text-gray-600 text-center max-w-xs leading-relaxed">{alt}</p>
    <span className="text-[10px] text-gray-700 font-medium uppercase tracking-wider">
      Captura de tela — Em breve
    </span>
  </div>
);

/**
 * Responsive tutorial screenshot.
 * - On desktop (≥768px): shows desktopSrc
 * - On mobile (<768px): shows mobileSrc if available, otherwise falls back to desktopSrc
 * - If no image is provided, renders ImagePlaceholder
 */
const TutorialImage = ({ desktopSrc, mobileSrc, alt }: StepImage) => {
  if (!desktopSrc) return <ImagePlaceholder alt={alt} />;
  return (
    <picture>
      {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
      {!mobileSrc && (
        /* Fallback: show desktop image on all sizes when no mobile version exists */
        <source media="(max-width: 767px)" srcSet={desktopSrc} />
      )}
      <img
        src={desktopSrc}
        alt={alt}
        className="w-full rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/5"
        loading="lazy"
        style={{ height: 'auto' }}
      />
    </picture>
  );
};

/**
 * One numbered step inside a tutorial section.
 * Optionally renders a screenshot below the instruction text.
 */
const Step = ({
  number,
  children,
  image,
}: {
  number: number;
  children: ReactNode;
  image?: StepImage;
}) => (
  <div className="space-y-4">
    <div className="flex items-start gap-4">
      {/* Numbered badge */}
      <div
        className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-[0_0_12px_rgba(235,131,0,0.3)]"
        aria-hidden="true"
      >
        <span className="text-xs sm:text-sm font-black text-white">{number}</span>
      </div>
      {/* Step content */}
      <div className="flex-1 text-gray-300 text-sm sm:text-base leading-relaxed pt-1">
        {children}
      </div>
    </div>
    {image && (
      <div className="pl-12 sm:pl-14">
        <TutorialImage {...image} />
      </div>
    )}
  </div>
);

/**
 * Prominent heading for each tutorial section.
 * Includes an icon badge, "Tutorial N de 5" label, title, and description.
 */
const TutorialSectionHeader = ({
  number,
  icon,
  title,
  description,
  headingId,
}: {
  number: number;
  icon: ReactNode;
  title: string;
  description: string;
  headingId: string;
}) => (
  <div className="mb-8 sm:mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-light)] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-light text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">
        Tutorial {number} de 5
      </div>
    </div>
    <h2
      id={headingId}
      className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 leading-tight"
    >
      {title}
    </h2>
    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
      {description}
    </p>
  </div>
);

// ─── Navigation card data ─────────────────────────────────────────────────────

const TUTORIALS_NAV = [
  {
    id: 'acesso',
    icon: <LogIn size={22} className="text-white" aria-hidden="true" />,
    label: 'Como acessar a Central',
    short: 'Acesso',
  },
  {
    id: 'faturas',
    icon: <Receipt size={22} className="text-white" aria-hidden="true" />,
    label: 'Faturas e pagamento',
    short: 'Faturas',
  },
  {
    id: 'servicos',
    icon: <Package size={22} className="text-white" aria-hidden="true" />,
    label: 'Serviços contratados',
    short: 'Serviços',
  },
  {
    id: 'atendimentos',
    icon: <Headphones size={22} className="text-white" aria-hidden="true" />,
    label: 'Atendimentos',
    short: 'Atendimentos',
  },
  {
    id: 'dados',
    icon: <UserCheck size={22} className="text-white" aria-hidden="true" />,
    label: 'Meus Dados',
    short: 'Dados',
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollToTutorial(id: string) {
  const el = document.getElementById(`tutorial-${id}`);
  if (!el) return;
  const headerOffset = 96; // fixed header ~80px + 16px margin
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}

const CENTRAL_URL = 'https://central.origem.hubsoft.com.br/';

// ─── Page component ───────────────────────────────────────────────────────────

const Help = () => {
  return (
    <div className="min-h-screen bg-[var(--color-dark-900)]">
      <Header />

      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-30" aria-hidden="true" />
          <div
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[var(--color-primary)] rounded-full blur-[250px] opacity-[0.06]"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--color-secondary)] rounded-full blur-[250px] opacity-[0.05]"
            aria-hidden="true"
          />

          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-[var(--color-primary)] text-sm font-semibold mb-6">
                <BookOpen size={16} aria-hidden="true" />
                <span>Central de Ajuda</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                Tutoriais da{' '}
                <span className="text-gradient-primary">Central do Assinante</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                Aprenda a utilizar a Central do Assinante com nossos tutoriais passo a passo.
                Encontre suas faturas, consulte seus serviços e acompanhe seus atendimentos
                com facilidade.
              </p>
            </div>
          </div>
        </section>

        {/* ── Quick navigation cards ─────────────────────────────────────── */}
        <section className="relative py-10 bg-[var(--color-dark-800)]" aria-label="Navegação pelos tutoriais">
          <div className="absolute inset-0 bg-tech-grid-dense opacity-20" aria-hidden="true" />
          <div className="relative z-10 container mx-auto px-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest text-center mb-6">
              Escolha um tutorial
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {TUTORIALS_NAV.map((tutorial, index) => (
                <button
                  key={tutorial.id}
                  onClick={() => scrollToTutorial(tutorial.id)}
                  className="glass-card rounded-xl p-4 flex flex-col items-center gap-3 text-center hover:shadow-[0_0_24px_rgba(235,131,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 group animate-fade-in-up cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-800)]"
                  style={{ animationDelay: `${index * 80}ms` }}
                  aria-label={`Ir para: ${tutorial.label}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(235,131,0,0.4)] transition-shadow">
                    {tutorial.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors leading-tight hidden sm:block">
                    {tutorial.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors leading-tight sm:hidden">
                    {tutorial.short}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tutorial 1: Acesso ────────────────────────────────────────── */}
        <section
          id="tutorial-acesso"
          className="relative py-16 sm:py-20 bg-[var(--color-dark-900)]"
          aria-labelledby="heading-tutorial-1"
        >
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <TutorialSectionHeader
                number={1}
                headingId="heading-tutorial-1"
                icon={<LogIn size={20} className="text-white" aria-hidden="true" />}
                title="Como acessar a Central do Assinante"
                description="Veja como entrar na sua conta na Central do Assinante da Origem Digital — seja no primeiro acesso ou nos acessos seguintes."
              />

              <div className="space-y-8">
                <Step
                  number={1}
                  image={{
                    desktopSrc: imgLogin,
                    alt: 'Tela inicial da Central do Assinante mostrando o campo para informar CPF ou CNPJ, a caixa de concordância com os termos de uso e o botão Fazer Login',
                  }}
                >
                  <strong className="text-white">Informe seu CPF ou CNPJ.</strong>{' '}
                  Na tela inicial da Central do Assinante, preencha o campo com o seu CPF ou
                  CNPJ. Em seguida, marque a caixa indicando que você concorda com os termos
                  de uso e clique em <UiLabel>Fazer Login</UiLabel>.
                </Step>

                <Step
                  number={2}
                  image={{
                    desktopSrc: imgSenha,
                    alt: 'Tela de senha da Central do Assinante com campo para digitar a senha de acesso e botão para confirmar',
                  }}
                >
                  <strong className="text-white">Informe sua senha.</strong>{' '}
                  Após informar o documento, o sistema solicitará sua senha de acesso. Digite
                  sua senha no campo indicado e confirme para entrar.
                </Step>

                <Step number={3}>
                  <strong className="text-white">Primeiro acesso?</strong>{' '}
                  Se for a primeira vez que você acessa a Central, o sistema exibirá
                  instruções para você criar uma senha. Siga as orientações apresentadas na
                  tela para concluir o cadastro.
                </Step>

                <Step number={4}>
                  <strong className="text-white">Precisa de ajuda?</strong>{' '}
                  Se tiver dificuldades para acessar a Central ou cadastrar sua senha, entre
                  em contato com a nossa equipe de suporte. Estamos aqui para ajudar.
                </Step>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={CENTRAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 glass-light text-[var(--color-secondary-light)] font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)]"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  <span>Acessar a Central do Assinante</span>
                </a>
                <button
                  onClick={() => scrollToTutorial('faturas')}
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <span>Próximo tutorial</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tutorial 2: Faturas ───────────────────────────────────────── */}
        <section
          id="tutorial-faturas"
          className="relative py-16 sm:py-20 bg-[var(--color-dark-800)]"
          aria-labelledby="heading-tutorial-2"
        >
          <div className="absolute inset-0 bg-tech-grid-dense opacity-20" aria-hidden="true" />
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <TutorialSectionHeader
                number={2}
                headingId="heading-tutorial-2"
                icon={<Receipt size={20} className="text-white" aria-hidden="true" />}
                title="Como consultar e pagar suas faturas"
                description="Saiba como localizar suas faturas, visualizar o boleto e realizar o pagamento via Pix de forma simples e segura."
              />

              <div className="space-y-8">
                <Step number={1}>
                  <strong className="text-white">
                    Acesse <UiLabel>2ª Via de Faturas</UiLabel>.
                  </strong>{' '}
                  No menu da Central do Assinante, clique na opção{' '}
                  <UiLabel>2ª Via de Faturas</UiLabel> para visualizar suas cobranças.
                </Step>

                <Step
                  number={2}
                  image={{
                    desktopSrc: imgFaturas,
                    alt: 'Lista de faturas na Central do Assinante exibindo data de vencimento, valor e status de cada cobrança',
                  }}
                >
                  <strong className="text-white">Localize a fatura desejada.</strong>{' '}
                  A tela exibirá suas faturas disponíveis. Verifique a{' '}
                  <strong className="text-white">data de vencimento</strong>, o{' '}
                  <strong className="text-white">valor</strong> e o{' '}
                  <strong className="text-white">status</strong> de cada cobrança antes de
                  prosseguir.
                </Step>

                <Step number={3}>
                  <strong className="text-white">Visualize o boleto.</strong>{' '}
                  Clique no botão <UiLabel>Ver</UiLabel> para abrir o documento de cobrança
                  correspondente à fatura selecionada. Essa opção permite consultar os
                  detalhes do boleto.
                </Step>

                <Step number={4}>
                  <strong className="text-white">Pague com Pix.</strong>{' '}
                  Ao clicar em <UiLabel>Pagar com Pix</UiLabel>, o sistema abrirá uma janela
                  com duas formas de pagamento:
                  <div className="mt-4 space-y-3">
                    <div className="glass-card rounded-xl p-4">
                      <p className="text-sm font-semibold text-white mb-1">
                        Opção A — QR Code
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Abra o aplicativo do seu banco, acesse a opção de pagamento por Pix e
                        use a câmera para escanear o QR Code exibido na tela.
                      </p>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <p className="text-sm font-semibold text-white mb-1">
                        Opção B — Pix Copia e Cola
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Copie o código exibido no campo{' '}
                        <UiLabel>Pix Copia e Cola</UiLabel>, abra o aplicativo do seu banco,
                        acesse a opção Pix e cole o código para realizar o pagamento.
                      </p>
                    </div>
                  </div>
                </Step>

                <Step number={5}>
                  <strong className="text-white">Confirme o pagamento.</strong>{' '}
                  Antes de confirmar a transação no aplicativo do seu banco, verifique o{' '}
                  <strong className="text-white">nome do destinatário</strong> e o{' '}
                  <strong className="text-white">valor</strong> exibidos na tela. Apenas
                  conclua o pagamento após confirmar que as informações estão corretas.
                </Step>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={CENTRAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 glass-light text-[var(--color-secondary-light)] font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)]"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  <span>Acessar a Central do Assinante</span>
                </a>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => scrollToTutorial('acesso')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>Tutorial anterior</span>
                  </button>
                  <button
                    onClick={() => scrollToTutorial('servicos')}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <span>Próximo tutorial</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tutorial 3: Serviços ──────────────────────────────────────── */}
        <section
          id="tutorial-servicos"
          className="relative py-16 sm:py-20 bg-[var(--color-dark-900)]"
          aria-labelledby="heading-tutorial-3"
        >
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <TutorialSectionHeader
                number={3}
                headingId="heading-tutorial-3"
                icon={<Package size={20} className="text-white" aria-hidden="true" />}
                title="Como consultar seus serviços contratados"
                description="Veja como acessar as informações dos serviços de internet vinculados ao seu cadastro na Central do Assinante."
              />

              <div className="space-y-8">
                <Step number={1}>
                  <strong className="text-white">
                    Acesse <UiLabel>Serviços Contratados</UiLabel>.
                  </strong>{' '}
                  No menu da Central do Assinante, selecione a opção{' '}
                  <UiLabel>Serviços Contratados</UiLabel>.
                </Step>

                <Step
                  number={2}
                  image={{
                    desktopSrc: imgServicos,
                    alt: 'Tela de serviços contratados na Central do Assinante exibindo status, endereço de instalação e valor do plano',
                  }}
                >
                  <strong className="text-white">Localize o serviço.</strong>{' '}
                  A tela exibirá as informações dos serviços vinculados ao seu cadastro, como{' '}
                  <strong className="text-white">status</strong>,{' '}
                  <strong className="text-white">endereço de instalação</strong> e{' '}
                  <strong className="text-white">valor do plano</strong>.
                </Step>

                <Step number={3}>
                  <strong className="text-white">Consulte as informações disponíveis.</strong>{' '}
                  Utilize os dados apresentados para identificar e conferir os serviços
                  contratados.
                </Step>

                {/* Aviso sobre funcionalidade não disponível */}
                <div
                  className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-warning)]/5 border border-[var(--color-warning)]/15"
                  role="note"
                  aria-label="Atenção: funcionalidade não disponível"
                >
                  <Info
                    size={18}
                    className="text-[var(--color-warning)] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <strong className="text-[var(--color-warning)]">Atenção:</strong> A opção{' '}
                    <UiLabel>Ações</UiLabel> pode exibir a opção{' '}
                    <UiLabel>Editar</UiLabel>, relacionada a configurações de pagamento
                    recorrente. Essa funcionalidade ainda{' '}
                    <strong className="text-white">não está disponível</strong> na Origem
                    Digital. Se precisar de informações sobre formas de pagamento, entre em
                    contato com o nosso suporte.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={CENTRAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 glass-light text-[var(--color-secondary-light)] font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)]"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  <span>Acessar a Central do Assinante</span>
                </a>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => scrollToTutorial('faturas')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>Tutorial anterior</span>
                  </button>
                  <button
                    onClick={() => scrollToTutorial('atendimentos')}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <span>Próximo tutorial</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tutorial 4: Atendimentos ──────────────────────────────────── */}
        <section
          id="tutorial-atendimentos"
          className="relative py-16 sm:py-20 bg-[var(--color-dark-800)]"
          aria-labelledby="heading-tutorial-4"
        >
          <div className="absolute inset-0 bg-tech-grid-dense opacity-20" aria-hidden="true" />
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <TutorialSectionHeader
                number={4}
                headingId="heading-tutorial-4"
                icon={<Headphones size={20} className="text-white" aria-hidden="true" />}
                title="Como consultar atendimentos e ordens de serviço"
                description="Saiba como visualizar o histórico dos seus atendimentos e acompanhar as informações registradas em cada ocorrência."
              />

              <div className="space-y-8">
                <Step number={1}>
                  <strong className="text-white">
                    Acesse <UiLabel>Atendimentos</UiLabel>.
                  </strong>{' '}
                  No menu da Central do Assinante, clique na opção{' '}
                  <UiLabel>Atendimentos</UiLabel>.
                </Step>

                <Step
                  number={2}
                  image={{
                    desktopSrc: imgAtendimentos,
                    alt: 'Lista de atendimentos na Central do Assinante com registros, datas e status de cada ocorrência',
                  }}
                >
                  <strong className="text-white">Localize o registro desejado.</strong>{' '}
                  A tela exibirá o histórico dos seus atendimentos. Identifique o atendimento
                  ou a ordem de serviço que você deseja consultar.
                </Step>

                <Step number={3}>
                  <strong className="text-white">Abra os detalhes.</strong>{' '}
                  Clique em <UiLabel>Gerir atendimento</UiLabel> ou{' '}
                  <UiLabel>Ver ordem de serviço</UiLabel>, conforme a opção disponível para o
                  registro que você deseja consultar.
                </Step>

                <Step number={4}>
                  <strong className="text-white">Consulte as informações registradas.</strong>{' '}
                  A tela de detalhes apresenta:
                  <ul className="mt-3 space-y-2 pl-1" aria-label="Informações exibidas">
                    {[
                      'Dados do cliente',
                      'Informações do plano',
                      'Descrição registrada na abertura do atendimento',
                      'Descrição registrada no fechamento do atendimento',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0 mt-2"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Step>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={CENTRAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 glass-light text-[var(--color-secondary-light)] font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)]"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  <span>Acessar a Central do Assinante</span>
                </a>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => scrollToTutorial('servicos')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>Tutorial anterior</span>
                  </button>
                  <button
                    onClick={() => scrollToTutorial('dados')}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <span>Próximo tutorial</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tutorial 5: Dados ──────────────────────────────────────────── */}
        <section
          id="tutorial-dados"
          className="relative py-16 sm:py-20 bg-[var(--color-dark-900)]"
          aria-labelledby="heading-tutorial-5"
        >
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <TutorialSectionHeader
                number={5}
                headingId="heading-tutorial-5"
                icon={<UserCheck size={20} className="text-white" aria-hidden="true" />}
                title="Como manter seus dados atualizados"
                description="Saiba como consultar seus dados de contato na Central do Assinante e entender a importância de mantê-los corretos."
              />

              <div className="space-y-8">
                <Step number={1}>
                  <strong className="text-white">
                    Acesse <UiLabel>Meus Dados</UiLabel>.
                  </strong>{' '}
                  No menu da Central do Assinante, selecione a opção{' '}
                  <UiLabel>Meus Dados</UiLabel> para visualizar suas informações cadastrais.
                </Step>

                <Step
                  number={2}
                  image={{
                    desktopSrc: imgMeusDados,
                    alt: 'Tela de dados cadastrais na Central do Assinante mostrando telefone, e-mail e demais informações de contato',
                  }}
                >
                  <strong className="text-white">Confira seus dados de contato.</strong>{' '}
                  Verifique se seu <strong className="text-white">telefone</strong>,{' '}
                  <strong className="text-white">e-mail</strong> e demais informações de
                  contato estão corretos e atualizados.
                  <div className="mt-4 p-4 rounded-xl bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/15">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      <strong className="text-[var(--color-secondary-light)]">
                        Por que o e-mail é importante?
                      </strong>{' '}
                      A Origem Digital envia mensalmente os boletos por e-mail para os clientes
                      que possuem um endereço eletrônico cadastrado no sistema. Manter o e-mail
                      atualizado garante que você receba suas cobranças sem precisar acessar a
                      Central toda vez.
                    </p>
                  </div>
                </Step>

                <Step number={3}>
                  <strong className="text-white">Precisa corrigir seus dados?</strong>{' '}
                  As alterações cadastrais devem ser solicitadas à equipe de suporte da Origem
                  Digital. Se alguma informação estiver desatualizada ou incorreta, entre em
                  contato conosco para que possamos fazer a correção.
                </Step>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={CENTRAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 glass-light text-[var(--color-secondary-light)] font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)]"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  <span>Acessar a Central do Assinante</span>
                </a>
                <button
                  onClick={() => scrollToTutorial('atendimentos')}
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 font-semibold transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Tutorial anterior</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Support CTA ───────────────────────────────────────────────── */}
        <section
          className="relative py-20 bg-[var(--color-dark-800)]"
          aria-labelledby="heading-support"
        >
          <div className="absolute inset-0 bg-dot-pattern opacity-20" aria-hidden="true" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-secondary)] rounded-full blur-[300px] opacity-[0.06]"
            aria-hidden="true"
          />

          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white mb-6 shadow-[0_0_30px_rgba(235,131,0,0.3)]"
                aria-hidden="true"
              >
                <MessageCircle size={28} />
              </div>

              <h2
                id="heading-support"
                className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4"
              >
                Ainda precisa de ajuda?
              </h2>
              <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                Nossa equipe de suporte está pronta para atender você. Entre em contato pelo
                WhatsApp, telefone ou e-mail.
              </p>

              {/* Contact cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <a
                  href={`https://wa.me/${COMPANY_INFO.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-[0_0_20px_rgba(235,131,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  aria-label="Contato via WhatsApp: 4003-8398"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <MessageCircle size={20} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    WhatsApp
                  </span>
                  <span className="text-sm text-gray-400">4003-8398</span>
                </a>

                <a
                  href={`tel:+${COMPANY_INFO.phone}`}
                  className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-[0_0_20px_rgba(235,131,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  aria-label="Telefone: 4003-8398"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <Phone size={20} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Telefone
                  </span>
                  <span className="text-sm text-gray-400">4003-8398</span>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-[0_0_20px_rgba(235,131,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  aria-label={`E-mail: ${COMPANY_INFO.email}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <Mail size={20} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    E-mail
                  </span>
                  <span className="text-sm text-gray-400 break-all">{COMPANY_INFO.email}</span>
                </a>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppButton
                  variant="primary"
                  message="Olá! Tenho dúvidas sobre a Central do Assinante e gostaria de ajuda."
                  className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] font-bold px-8 py-4 rounded-xl text-base justify-center hover:shadow-[0_0_30px_rgba(235,131,0,0.3)] hover:scale-[1.02]"
                  utm={{ source: 'ajuda', medium: 'website', campaign: 'central-assinante' }}
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  <span>Falar com o suporte</span>
                </WhatsAppButton>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 glass-light text-gray-300 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  <span>Voltar ao início</span>
                </Link>
              </div>

              {/* Business hours */}
              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-xs text-gray-600 font-semibold uppercase tracking-widest mb-4">
                  Horários de atendimento
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="glass-card rounded-xl p-4 text-center">
                    <p className="text-sm font-semibold text-gray-300 mb-1">Presencial</p>
                    <p className="text-xs text-gray-500">
                      {COMPANY_INFO.businessHours.presencial.days}
                    </p>
                    <p className="text-xs text-gray-500">
                      {COMPANY_INFO.businessHours.presencial.hours}
                    </p>
                  </div>
                  <div className="glass-card rounded-xl p-4 text-center">
                    <p className="text-sm font-semibold text-gray-300 mb-1">Online</p>
                    <p className="text-xs text-gray-500">
                      {COMPANY_INFO.businessHours.online.days}
                    </p>
                    <p className="text-xs text-gray-500">
                      {COMPANY_INFO.businessHours.online.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Help;
