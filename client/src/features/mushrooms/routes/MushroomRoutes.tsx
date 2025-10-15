import { Route, Routes } from 'react-router-dom';
import ObservationsPage from '../../observations/pages/ObservationsPage';

export default function MushroomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ObservationsPage />} />
        </Routes>
    );
}
