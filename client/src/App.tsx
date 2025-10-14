import { Route, Routes } from 'react-router-dom';
import './App.css';
import HealthPage from './features/health/healthPage';
import ObservationsPage from './features/observations/pages/ObservationsPage';

function App() {
    return (
        <>
            <Routes>
                <Route path="/health" element={<HealthPage />} />
                <Route path="/observations" element={<ObservationsPage />} />
            </Routes>
        </>
    );
}

export default App;
