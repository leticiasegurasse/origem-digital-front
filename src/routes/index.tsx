// Definição das rotas principais
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CitySelection, Coverage, Help, CityGuard } from '../features/site';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Rotas do Site Público */}
      <Route path="/" element={
        <CityGuard>
          <Home />
        </CityGuard>
      } />
      <Route path="/selecionar-cidade" element={<CitySelection />} />
      <Route path="/cobertura" element={
        <CityGuard>
          <Coverage />
        </CityGuard>
      } />
      <Route path="/ajuda" element={
        <CityGuard>
          <Help />
        </CityGuard>
      } />
      
      {/* Rotas do Painel (futuro) */}
      {/* <Route path="/painel/*" element={<PainelRoutes />} /> */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes; 