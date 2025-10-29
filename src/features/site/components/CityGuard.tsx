import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCitySelection } from '../contexts/CityContext';
import CitySelection from '../pages/CitySelection';

interface CityGuardProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rotas que precisam de uma cidade selecionada
 * Redireciona automaticamente para a página de seleção de cidade se não houver cidade salva
 */
const CityGuard = ({ children }: CityGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasCitySelected, selectedCity } = useCitySelection();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Lista de rotas que NÃO precisam de cidade selecionada
  const publicRoutes = ['/selecionar-cidade'];

  // Aguarda a inicialização do contexto
  useEffect(() => {
    // Simula aguardar a inicialização do localStorage
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    
    // Verifica se a rota atual é pública (não precisa de cidade)
    const isPublicRoute = publicRoutes.includes(location.pathname);
    
    if (isPublicRoute) {
      setIsLoading(false);
      return;
    }

    // Se não é rota pública e não há cidade selecionada, redireciona
    if (!hasCitySelected) {
      navigate('/selecionar-cidade', { 
        replace: true,
        state: { from: location.pathname } // Salva a rota original para redirecionar depois
      });
    } else {
      setIsLoading(false);
    }
  }, [hasCitySelected, location.pathname, navigate, isInitialized]);

  // Se está carregando, mostra um loading elegante
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-white/40 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Verificando sua localização...</h2>
          <p className="text-white/80">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  // Se está na página de seleção de cidade, mostra ela
  if (location.pathname === '/selecionar-cidade') {
    return <CitySelection />;
  }

  // Se tem cidade selecionada, mostra o conteúdo protegido
  return <>{children}</>;
};

export default CityGuard;
