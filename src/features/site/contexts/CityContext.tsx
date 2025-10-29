import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type City = 
  | 'Miracema'
  | 'Laje do Muriaé'
  | 'Paraíso do Tobias'
  | 'Pirapetinga'
  | 'Estrela Dalva'
  | 'Monte Alegre'
  | 'Palma'
  | 'Santo Antônio de Padua';

interface CityContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  clearCity: () => void;
  hasCitySelected: boolean;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

const CITY_STORAGE_KEY = 'origem-digital-selected-city';

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider = ({ children }: CityProviderProps) => {
  const [selectedCity, setSelectedCityState] = useState<City | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar cidade do localStorage na inicialização
  useEffect(() => {
    const storedCity = localStorage.getItem(CITY_STORAGE_KEY);
    if (storedCity) {
      try {
        const parsedCity = JSON.parse(storedCity) as City;
        setSelectedCityState(parsedCity);
      } catch (error) {
        console.error('Erro ao carregar cidade do localStorage:', error);
        localStorage.removeItem(CITY_STORAGE_KEY);
      }
    }
    setIsInitialized(true);
  }, []);

  // Função para definir cidade e salvar no localStorage
  const setSelectedCity = (city: City | null) => {
    setSelectedCityState(city);
    if (city) {
      localStorage.setItem(CITY_STORAGE_KEY, JSON.stringify(city));
    } else {
      localStorage.removeItem(CITY_STORAGE_KEY);
    }
  };

  // Função para limpar cidade selecionada
  const clearCity = () => {
    setSelectedCity(null);
  };

  const value: CityContextType = {
    selectedCity,
    setSelectedCity,
    clearCity,
    hasCitySelected: selectedCity !== null,
  };

  return (
    <CityContext.Provider value={value}>
      {children}
    </CityContext.Provider>
  );
};

export const useCitySelection = (): CityContextType => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCitySelection deve ser usado dentro de um CityProvider');
  }
  return context;
};
