import { useNavigate } from 'react-router-dom';
import { authService } from '../../../shared/services/authService';
import LoginForm from '../components/loginForm/loginForm';

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = async (credentials: { email: string; password: string }) => {
        await authService.login(credentials);
        navigate('/home');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <LoginForm onSubmit={handleLogin} onRegisterClick={() => navigate('/register')} />
        </div>
    );
}
