import type { ReactNode } from 'react';
import { useCitySelection } from '../contexts/CityContext';

interface SiteLayoutProps {
  children: ReactNode;
}

/**
 * Layout específico para o site público da Origem Digital
 * Diferente do layout do painel administrativo
 * Inclui contexto de seleção de cidade
 */
const SiteLayout = ({ children }: SiteLayoutProps) => {
  // Inicializa o hook de seleção de cidade para garantir que o localStorage seja lido
  useCitySelection();

  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
};

export default SiteLayout;

