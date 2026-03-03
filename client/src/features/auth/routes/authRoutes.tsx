import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';

export default function MushroomRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}
