import { useNavigate } from 'react-router-dom';
import { authService } from '../../../shared/services/authService';
import LoginForm from '../components/loginForm/loginForm';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const handleLogin = async (credentials: { email: string; password: string }) => {
        try {
            await authService.login(credentials);
            await checkAuth();
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <LoginForm onSubmit={handleLogin} onRegisterClick={() => navigate('/register')} />
        </div>
    );
}
