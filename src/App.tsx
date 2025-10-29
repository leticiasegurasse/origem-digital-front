import AppRoutes from './routes';
import { CityProvider } from './features/site/contexts/CityContext';

function App() {
  return (
    <CityProvider>
      <AppRoutes />
    </CityProvider>
  );
}

export default App;
