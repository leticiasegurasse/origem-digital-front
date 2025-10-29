import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, X } from 'lucide-react';
import { useCitySelection } from '../contexts/CityContext';
import type { City } from '../contexts/CityContext';

const CitySelector = () => {
  const { selectedCity, setSelectedCity } = useCitySelection();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const cities: { value: City; label: string }[] = [
    { value: 'Miracema', label: 'Miracema' },
    { value: 'Laje do Muriaé', label: 'Laje do Muriaé' },
    { value: 'Paraíso do Tobias', label: 'Paraíso do Tobias' },
    { value: 'Pirapetinga', label: 'Pirapetinga' },
    { value: 'Estrela Dalva', label: 'Estrela Dalva' },
    { value: 'Monte Alegre', label: 'Monte Alegre' },
    { value: 'Palma', label: 'Palma' },
    { value: 'Santo Antônio de Padua', label: 'Santo Antônio de Padua' },
  ];

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
  };

  const handleClearCity = () => {
    setSelectedCity(null);
    setIsDropdownOpen(false);
    // Redireciona para a página de seleção de cidade
    navigate('/selecionar-cidade');
  };

  if (!selectedCity) {
    return (
      <Link
        to="/selecionar-cidade"
        className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
      >
        <MapPin size={16} />
        <span className="text-sm font-medium">Selecionar cidade</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
      >
        <MapPin size={16} />
        <span className="text-sm font-medium">{selectedCity}</span>
        <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Sua cidade</h3>
              <button
                onClick={handleClearCity}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Limpar seleção"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{selectedCity}</p>
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {cities.map((city) => (
              <button
                key={city.value}
                onClick={() => handleCityChange(city.value)}
                className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                  selectedCity === city.value ? 'bg-orange-50 text-[var(--color-primary)]' : 'text-gray-700'
                }`}
              >
                {city.label}
              </button>
            ))}
          </div>
          
          <div className="p-3 border-t">
            <Link
              to="/selecionar-cidade"
              className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium"
              onClick={() => setIsDropdownOpen(false)}
            >
              Ver todas as cidades
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
