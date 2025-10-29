import { Check, MessageCircle, ChevronDown } from 'lucide-react';
import { plansData } from '../services/plans';
import WhatsAppButton from './WhatsAppButton';
import { useCitySelection } from '../contexts/CityContext';
import type { City } from '../contexts/CityContext';

const CityPlansSelector = () => {
  const { selectedCity, setSelectedCity } = useCitySelection();

  // Se não há cidade selecionada, não renderiza nada
  if (!selectedCity) {
    return null;
  }

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const currentCityPlans = plansData.find((c) => c.city === selectedCity);

  return (
    <section id="planos" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Internet de alta velocidade com fibra ótica 100% até sua casa
          </p>
        </div>

        {/* Seletor de Cidade Melhorado */}
        <div className="max-w-lg mx-auto mb-16">
          <label htmlFor="city-select" className="block text-center text-base font-bold text-gray-800 mb-4">
            📍 Selecione sua cidade:
          </label>
          <div className="relative">
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value as City)}
              className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 text-lg font-semibold text-gray-800 bg-white shadow-md hover:shadow-lg transition-all"
            >
              {plansData.map((cityPlan) => (
                <option key={cityPlan.city} value={cityPlan.city}>
                  {cityPlan.city}
                </option>
              ))}
            </select>
            <ChevronDown
              size={28}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)] pointer-events-none"
            />
          </div>
        </div>

        {/* Grade de Planos Melhorada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {currentCityPlans?.plans.map((plan) => {
            const isPopular = plan.speed === 600 || plan.speed === 500;
            const isGiga = plan.speed >= 1000;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 transition-all duration-300 ${
                  isPopular 
                    ? 'border-4 border-[var(--color-primary)] shadow-2xl' 
                    : 'border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2'
                }`}
              >
                {/* Badge Popular */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white px-4 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                    Mais Popular
                  </div>
                )}

                {/* Velocidade */}
                <div className="text-center mb-6 sm:mb-8 mt-2">
                  <div className={`font-black mb-2 ${
                    isGiga ? 'text-5xl sm:text-6xl md:text-7xl text-[var(--color-secondary)]' : 'text-4xl sm:text-5xl md:text-6xl text-[var(--color-primary)]'
                  }`}>
                    {isGiga ? '1GB' : plan.speed}
                  </div>
                  <div className="text-gray-600 font-bold text-sm sm:text-base uppercase tracking-wide">
                    {isGiga ? 'Giga' : 'Mega'}
                  </div>
                </div>

                {/* Preço */}
                <div className="text-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b-2 border-gray-100">
                  <div className="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold">a partir de</div>
                  <div className="flex items-start justify-center gap-1 mb-1">
                    <span className="text-lg sm:text-xl font-bold text-gray-700 mt-1 sm:mt-2">R$</span>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-secondary)]">
                      {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-semibold">/mês</div>
                </div>

                {/* Benefícios */}
                <ul className="space-y-4 mb-8">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base">
                      <Check size={22} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5 font-bold" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Principal */}
                <WhatsAppButton
                  variant={isPopular ? "secondary" : "primary"}
                  message={`Olá! Gostaria de assinar o plano de ${isGiga ? '1GB' : plan.speed + ' Mega'} por R$ ${plan.price.toFixed(2)} em ${selectedCity}.`}
                  className={`w-full justify-center text-base py-4`}
                  utm={{ source: 'planos', medium: 'website', campaign: `plano-${plan.speed}mb` }}
                >
                  <MessageCircle size={20} />
                  <span className="font-bold">Assinar Agora</span>
                </WhatsAppButton>
              </div>
            );
          })}
        </div>

        {/* Observação Legal Melhorada */}
        <div className="bg-gray-100 rounded-xl p-6 max-w-4xl mx-auto space-y-3">
          <p className="text-center text-sm text-gray-600 leading-relaxed">
            <strong>Informações importantes:</strong> Valores mensais. Consulte condições específicas, disponibilidade e requisitos técnicos 
            para instalação em sua região. Sujeito à análise de viabilidade técnica.
          </p>
          <p className="text-center text-sm text-gray-600 leading-relaxed">
            <strong>* Instalação grátis:</strong> Consulte o regulamento para conhecer as condições de instalação e demais termos contratuais. 
            Entre em contato via WhatsApp para mais informações.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CityPlansSelector;

