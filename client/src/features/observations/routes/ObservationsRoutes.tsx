import { Route, Routes } from 'react-router-dom';
import ObservationsPage from '../pages/ObservationsPage';

export default function ObservationsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ObservationsPage />} />
        </Routes>
    );
}
