import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, ArrowRight, Check, Search, X, Map } from 'lucide-react';
import { useCitySelection } from '../contexts/CityContext';
import type { City } from '../contexts/CityContext';

interface CityInfo {
  name: City;
  state: string;
  description: string;
  speeds: string;
  isAvailable: boolean;
}
import logo from '../../../media/image/logo-laranja-branca.svg';

const CitySelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedCity } = useCitySelection();
  const [selectedCity, setSelectedCityLocal] = useState<City | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const citiesData: CityInfo[] = [
    { name: 'Miracema', state: 'Rio de Janeiro', description: 'Cidade histórica com tradição', speeds: '200, 500, 600, 800 Mb', isAvailable: true },
    { name: 'Laje do Muriaé', state: 'Rio de Janeiro', description: 'Cidade do interior fluminense', speeds: '200, 500, 600, 800 Mb', isAvailable: true },
    { name: 'Paraíso do Tobias', state: 'Rio de Janeiro', description: 'Distrito de Miracema', speeds: '200, 500, 600, 800 Mb', isAvailable: true },
    { name: 'Pirapetinga', state: 'MG', description: 'Cidade do Vale do Paraíba', speeds: '200, 500, 600, 800 Mb', isAvailable: true },
    { name: 'Estrela Dalva', state: 'MG', description: 'Cidade do interior', speeds: '200, 500, 600, 800 Mb', isAvailable: true },
    { name: 'Monte Alegre', state: 'Rio de Janeiro', description: 'Cidade serrana', speeds: '200, 500, 600, 800 Mb', isAvailable: true },
    { name: 'Palma', state: 'MG', description: 'Cidade do interior', speeds: '300, 500, 800 Mb', isAvailable: true },
    { name: 'Santo Antônio de Padua', state: 'Rio de Janeiro', description: 'Cidade histórica', speeds: 'Em breve', isAvailable: false },
  ];

  const filteredCities = useMemo(() => {
    if (!searchTerm) return citiesData;
    return citiesData.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, citiesData]);

  const citiesByState = useMemo(() => {
    const grouped = filteredCities.reduce((acc, city) => {
      if (!acc[city.state]) {
        acc[city.state] = [];
      }
      acc[city.state].push(city);
      return acc;
    }, {} as Record<string, CityInfo[]>);
    return grouped;
  }, [filteredCities]);

  const handleCitySelect = (city: City) => {
    setSelectedCityLocal(city);
  };

  const handleContinue = () => {
    if (selectedCity) {
      setSelectedCity(selectedCity);
      setTimeout(() => {
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      }, 100);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark-900)] flex items-center justify-center p-6 md:p-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-tech-grid opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--color-primary)] rounded-full blur-[250px] opacity-[0.06]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-secondary)] rounded-full blur-[250px] opacity-[0.08]" />

      <div className="relative z-10 max-w-4xl w-full animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="Logo Origem Digital" className="h-16 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(235,131,0,0.3)]" />
          <p className="text-base text-gray-400">
            Selecione sua cidade para ver os planos disponíveis na sua região.
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* City list */}
          <div className="glass-light rounded-2xl overflow-hidden border border-white/10">
            <div className="p-4 space-y-6 max-h-80 overflow-y-auto scrollbar-thin" style={{ scrollbarGutter: 'stable' }}>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar por cidade ou estado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-11 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-2 focus:ring-[var(--color-primary)]/10 text-white placeholder-gray-500 text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {Object.entries(citiesByState).map(([state, cities]) => (
                <div key={state} className="space-y-3">
                  {/* State header */}
                  <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                    <Map className="text-[var(--color-primary)]" size={18} />
                    <h2 className="text-sm font-bold text-white">{state}</h2>
                    <span className="bg-white/5 text-gray-500 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {cities.length} {cities.length === 1 ? 'cidade' : 'cidades'}
                    </span>
                  </div>

                  {/* City list */}
                  <div className="grid grid-cols-1 gap-2">
                    {cities.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => city.isAvailable && handleCitySelect(city.name)}
                        disabled={!city.isAvailable}
                        className={`p-4 rounded-xl border transition-all duration-300 text-left group ${
                          selectedCity === city.name
                            ? 'border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10 shadow-[0_0_20px_rgba(235,131,0,0.1)]'
                            : city.isAvailable
                            ? 'border-white/5 hover:border-[var(--color-primary)]/30 hover:bg-white/5'
                            : 'border-white/5 bg-white/[0.02] cursor-not-allowed opacity-40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <MapPin
                              size={18}
                              className={`flex-shrink-0 ${
                                selectedCity === city.name
                                  ? 'text-[var(--color-primary)]'
                                  : city.isAvailable
                                  ? 'text-gray-600 group-hover:text-[var(--color-primary)]'
                                  : 'text-gray-700'
                              }`}
                            />
                            <h3 className={`font-medium text-sm ${
                              city.isAvailable ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {city.name}
                            </h3>
                          </div>
                          {selectedCity === city.name && city.isAvailable && (
                            <Check size={18} className="text-[var(--color-primary)]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No results */}
          {Object.keys(citiesByState).length === 0 && (
            <div className="text-center py-12">
              <Search className="mx-auto text-gray-600 mb-4" size={40} />
              <h3 className="text-base font-semibold text-gray-400 mb-2">
                Nenhuma cidade encontrada
              </h3>
              <p className="text-sm text-gray-600">
                Tente buscar por outro termo ou entre em contato conosco
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-white/5">
            <button
              onClick={handleContinue}
              disabled={!selectedCity}
              className="flex-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(235,131,0,0.3)] disabled:shadow-none hover:scale-[1.01] disabled:hover:scale-100"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelection;
