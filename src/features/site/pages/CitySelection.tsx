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
import logo from '../../../assets/image/logo-roxo-branco.png';

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
    { name: 'Palma', state: 'Rio de Janeiro', description: 'Cidade do interior', speeds: '300, 500, 800 Mb', isAvailable: true },
    { name: 'Santo Antônio de Padua', state: 'Rio de Janeiro', description: 'Cidade histórica', speeds: 'Em breve', isAvailable: false },
  ];

  // Filtrar cidades por termo de busca
  const filteredCities = useMemo(() => {
    if (!searchTerm) return citiesData;
    
    return citiesData.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, citiesData]);

  // Agrupar cidades por estado
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
      
      // Aguarda um momento para o estado ser atualizado
      setTimeout(() => {
        // Redireciona para a página original ou para a home
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      }, 100);
    }
  };


  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center p-16">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-gray-900 text-center">
          <img src={logo} alt="Logo Origem Digital" className="h-20 mx-auto mb-4" />
          <p className="text-lg text-white">
            Selecione sua cidade para ver os planos disponíveis na sua região.
          </p>
        </div>

        <div className="p-8">
           {/* Lista de Cidades por Estado */}
           <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
             <div className="p-4 space-y-8 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ scrollbarGutter: 'stable' }}>
            {/* Barra de Busca */}
            <div className="mb-8">
                <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Buscar por cidade, estado ou região..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20 text-lg"
                />
                {searchTerm && (
                    
                    <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                    <X size={20} />
                    </button>
                )}
                </div>
            </div>
            {Object.entries(citiesByState).map(([state, cities]) => (
              <div key={state} className="space-y-4">
                {/* Cabeçalho do Estado */}
                <div className="flex items-center gap-3 pb-2 border-b-2 border-gray-100">
                  <Map className="text-[var(--color-primary)]" size={24} />
                  <h2 className="text-xl font-bold text-gray-800">{state}</h2>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                    {cities.length} {cities.length === 1 ? 'cidade' : 'cidades'}
                  </span>
                </div>

                {/* Lista de Cidades */}
                <div className="grid grid-cols-1 gap-3">
                  {cities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => city.isAvailable && handleCitySelect(city.name)}
                      disabled={!city.isAvailable}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg group ${
                        selectedCity === city.name
                          ? 'border-[var(--color-primary)] bg-orange-50 shadow-lg'
                          : city.isAvailable
                          ? 'border-gray-200 hover:border-[var(--color-primary)] hover:bg-orange-50'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin 
                            size={20} 
                            className={`flex-shrink-0 mt-1 ${
                              selectedCity === city.name 
                                ? 'text-[var(--color-primary)]' 
                                : city.isAvailable 
                                ? 'text-gray-400 group-hover:text-[var(--color-primary)]' 
                                : 'text-gray-300'
                            }`} 
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className={`font-semibold truncate ${
                              city.isAvailable ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {city.name}
                            </h3>
                            
                          </div>
                        </div>
                        {selectedCity === city.name && city.isAvailable && (
                          <Check size={20} className="text-[var(--color-primary)] flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
             </div>
           </div>

          {/* Mensagem quando não há resultados */}
          {Object.keys(citiesByState).length === 0 && (
            <div className="text-center py-12">
              <Search className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhuma cidade encontrada
              </h3>
              <p className="text-gray-500">
                Tente buscar por outro termo ou entre em contato conosco
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[var(--color-primary-light)]">
            <button
              onClick={handleContinue}
              disabled={!selectedCity}
              className="flex-1 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
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
