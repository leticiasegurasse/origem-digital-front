import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Check, Wifi, Zap, MessageCircle, Search, X, ChevronRight, ArrowLeft, Map } from 'lucide-react';
import { plansData } from '../services/plans';
import WhatsAppButton from '../components/WhatsAppButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const cityStateMap: Record<string, string> = {
  'Miracema': 'Rio de Janeiro',
  'Laje do Muriaé': 'Rio de Janeiro',
  'Paraíso do Tobias': 'Rio de Janeiro',
  'Monte Alegre': 'Rio de Janeiro',
  'Palma': 'Minas Gerais',
  'Santo Antônio de Padua': 'Rio de Janeiro',
  'Pirapetinga': 'Minas Gerais',
  'Estrela Dalva': 'Minas Gerais',
};

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  const filteredCities = plansData.filter((city) =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cityStateMap[city.city] || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const citiesByState = useMemo(() => {
    const grouped: Record<string, typeof filteredCities> = {};
    for (const cityData of filteredCities) {
      const state = cityStateMap[cityData.city] || 'Outros';
      if (!grouped[state]) grouped[state] = [];
      grouped[state].push(cityData);
    }
    return grouped;
  }, [filteredCities]);

  const toggleCity = (cityName: string) => {
    setExpandedCity(expandedCity === cityName ? null : cityName);
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark-900)]">
      <Header />

      <main>
        {/* Hero da página */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-30" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[var(--color-primary)] rounded-full blur-[250px] opacity-[0.06]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--color-secondary)] rounded-full blur-[250px] opacity-[0.05]" />

          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-[var(--color-primary)] text-sm font-semibold mb-6">
                <MapPin size={16} />
                <span>Área de cobertura</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                Veja se atendemos a{' '}
                <span className="text-gradient-primary">sua região</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10">
                A Origem Digital está presente em diversas cidades da região, levando internet de fibra óptica com qualidade e suporte local.
              </p>

              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por cidade ou estado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-2 focus:ring-[var(--color-primary)]/10 text-white placeholder-gray-500 text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Lista de cidades por estado */}
        <section className="relative py-16 bg-[var(--color-dark-800)]">
          <div className="absolute inset-0 bg-tech-grid-dense opacity-20" />

          <div className="relative z-10 container mx-auto px-4">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-14">
              {[
                { value: `${plansData.length}`, label: 'Cidades atendidas' },
                { value: '100%', label: 'Fibra óptica' },
                { value: '200+', label: 'Mega de velocidade' },
                { value: '24/7', label: 'Suporte técnico' },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-xl p-4 text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="text-xl sm:text-2xl font-black text-gradient-primary">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Cities by state */}
            <div className="max-w-4xl mx-auto space-y-10">
              {Object.keys(citiesByState).length === 0 ? (
                <div className="text-center py-16 animate-fade-in-up">
                  <Search className="mx-auto text-gray-600 mb-4" size={40} />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">Nenhuma cidade encontrada</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Não encontramos essa cidade na nossa cobertura, mas podemos estar expandindo em breve.
                  </p>
                  <WhatsAppButton
                    variant="primary"
                    message="Olá! Gostaria de saber se vocês atendem a minha região."
                    className="mx-auto rounded-xl"
                    utm={{ source: 'cobertura', medium: 'website', campaign: 'consulta-regiao' }}
                  >
                    <MessageCircle size={18} />
                    <span>Consultar minha região</span>
                  </WhatsAppButton>
                </div>
              ) : (
                Object.entries(citiesByState).map(([state, cities]) => (
                  <div key={state}>
                    {/* State header */}
                    <div className="flex items-center gap-3 mb-5 animate-fade-in-up">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-light)] flex items-center justify-center flex-shrink-0">
                        <Map size={16} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white">{state}</h2>
                        <span className="text-xs text-gray-500">
                          {cities.length} {cities.length === 1 ? 'cidade' : 'cidades'}
                        </span>
                      </div>
                    </div>

                    {/* Cities list */}
                    <div className="space-y-4 pl-0 sm:pl-12">
                      {cities.map((cityData, index) => {
                        const isExpanded = expandedCity === cityData.city;
                        const minPrice = Math.min(...cityData.plans.map((p) => p.price));
                        const maxSpeed = Math.max(...cityData.plans.map((p) => p.speed));
                        const hasWifi6 = cityData.plans.some((p) => p.hasWifi6);

                        return (
                          <div
                            key={cityData.city}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 80}ms` }}
                          >
                            {/* City card header */}
                            <button
                              onClick={() => toggleCity(cityData.city)}
                              className={`w-full glass-card rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 hover:shadow-[0_0_30px_rgba(235,131,0,0.08)] ${
                                isExpanded ? 'border border-[var(--color-primary)]/30 shadow-[0_0_30px_rgba(235,131,0,0.1)]' : 'hover:-translate-y-0.5'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 min-w-0">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                                    <MapPin size={20} className="text-white" />
                                  </div>
                                  <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-white truncate">{cityData.city}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                      <span className="text-xs sm:text-sm text-gray-500">
                                        {cityData.plans.length} {cityData.plans.length === 1 ? 'plano' : 'planos'}
                                      </span>
                                      <span className="text-xs sm:text-sm text-gray-500">
                                        Até {maxSpeed >= 1000 ? '1GB' : `${maxSpeed} Mega`}
                                      </span>
                                      <span className="text-xs sm:text-sm text-[var(--color-primary)] font-semibold">
                                        A partir de R$ {minPrice.toFixed(2).replace('.', ',')}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 flex-shrink-0">
                                  {hasWifi6 && (
                                    <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full glass-light text-xs font-semibold text-[var(--color-secondary-light)]">
                                      <Wifi size={12} />
                                      <span>Wi-Fi 6</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-xs font-semibold text-green-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    <span className="hidden sm:inline">Disponível</span>
                                  </div>
                                  <ChevronRight
                                    size={20}
                                    className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                                  />
                                </div>
                              </div>
                            </button>

                            {/* Expanded plans */}
                            {isExpanded && (
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up">
                                {cityData.plans.map((plan) => {
                                  const isGiga = plan.speed >= 1000;

                                  return (
                                    <div
                                      key={plan.id}
                                      className="glass-card rounded-xl p-5 flex items-center justify-between gap-4 hover:shadow-[0_0_20px_rgba(235,131,0,0.06)] transition-all duration-300"
                                    >
                                      <div>
                                        <div className="flex items-baseline gap-1 mb-1">
                                          <span className="text-2xl font-black text-gradient-primary">
                                            {isGiga ? '1GB' : plan.speed}
                                          </span>
                                          <span className="text-xs font-bold text-gray-500 uppercase">
                                            {isGiga ? '' : 'Mega'}
                                          </span>
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                          <span className="text-xs text-gray-500">R$</span>
                                          <span className="text-lg font-bold text-white">{plan.price.toFixed(2).replace('.', ',')}</span>
                                          <span className="text-xs text-gray-500">/mês</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          {plan.benefits.map((b, i) => (
                                            <span key={i} className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                                              <Check size={10} className="text-[var(--color-primary)]" />
                                              {b}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                      <WhatsAppButton
                                        variant="primary"
                                        message={`Olá! Tenho interesse no plano de ${isGiga ? '1GB' : plan.speed + ' Mega'} por R$ ${plan.price.toFixed(2)} em ${cityData.city}.`}
                                        className="flex-shrink-0 rounded-lg px-4 py-2.5 text-sm"
                                        utm={{ source: 'cobertura', medium: 'website', campaign: `plano-${plan.speed}mb` }}
                                      >
                                        <MessageCircle size={16} />
                                        <span className="hidden sm:inline">Assinar</span>
                                      </WhatsAppButton>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA - Não encontrou sua cidade? */}
        <section className="relative py-20 bg-[var(--color-dark-900)]">
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-secondary)] rounded-full blur-[300px] opacity-[0.06]" />

          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-light)] text-white mb-6">
                <Zap size={28} />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
                Não encontrou sua cidade?
              </h2>
              <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                Estamos em constante expansão. Entre em contato para saber se temos previsão de atender a sua região.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppButton
                  variant="primary"
                  message="Olá! Gostaria de saber se vocês atendem a minha região."
                  className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] font-bold px-8 py-4 rounded-xl text-base justify-center hover:shadow-[0_0_30px_rgba(235,131,0,0.3)] hover:scale-[1.02]"
                  utm={{ source: 'cobertura', medium: 'website', campaign: 'consulta-regiao' }}
                >
                  <MessageCircle size={20} />
                  <span>Consultar minha região</span>
                </WhatsAppButton>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 glass-light text-gray-300 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft size={18} />
                  <span>Voltar ao início</span>
                </Link>
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

export default Coverage;
