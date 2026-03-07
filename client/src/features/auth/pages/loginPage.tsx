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
        <div className="flex items-center justify-center p-4">
            <LoginForm onSubmit={handleLogin} onRegisterClick={() => navigate('/register')} />
        </div>
    );
}
