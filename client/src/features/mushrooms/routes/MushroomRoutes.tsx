import { Route, Routes } from 'react-router-dom';
import MushroomsPage from '../pages/MushroomsPage';

export default function MushroomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MushroomsPage />} />
        </Routes>
    );
}
