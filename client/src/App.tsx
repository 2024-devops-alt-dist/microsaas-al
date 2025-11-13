import { Route, Routes } from 'react-router-dom';
import './App.css';
import HealthPage from './features/health/healthPage';
import ObservationsPage from './features/observations/pages/ObservationsPage';
import MushroomRoutes from './features/mushrooms/routes/MushroomRoutes';
import Navbar from './shared/components/Navbar/Navbar';

function App() {
    return (
        <main className="pb-20 pt-0 md:pt-20 md:pb-0">
            <Navbar />
            <Routes>
                <Route path="/health" element={<HealthPage />} />
                <Route path="/observations/*" element={<ObservationsPage />} />
                <Route path="/mushrooms/*" element={<MushroomRoutes />} />
            </Routes>
        </main>
    );
}

export default App;
