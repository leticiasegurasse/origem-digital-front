/**
 * Barrel export para facilitar imports do site
 */

// Pages
export { default as Home } from './pages/Home';
export { default as CitySelection } from './pages/CitySelection';

// Layouts
export { default as SiteLayout } from './layouts/SiteLayout';

// Components principais
export { default as Header } from './components/Header';
export { default as Footer } from './components/Footer';
export { default as AnnouncementBar } from './components/AnnouncementBar';
export { default as AnnouncementModal } from './components/AnnouncementModal';
export { default as WhatsAppButton } from './components/WhatsAppButton';
export { default as CitySelector } from './components/CitySelector';
export { default as CityGuard } from './components/CityGuard';

// Hooks
export { useCitySelection } from './contexts/CityContext';
export type { City } from './contexts/CityContext';
export type { CityInfo } from './hooks/useCitySelection';

// Types
export type { Plan, CityPlans } from './types/plans';
export type { CoverageCheckResult, LeadForm } from './types/coverage';

