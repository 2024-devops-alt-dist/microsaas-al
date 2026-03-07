import { useNavigate } from 'react-router-dom';
import { authService } from '../../../shared/services/authService';
import RegisterForm from '../components/registerForm/registerForm';

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = async (userData: {
        email: string;
        password: string;
        username: string;
        firstname: string;
        lastname: string;
    }) => {
        await authService.register(userData);
        navigate('/home');
    };

    return (
        <div className="flex items-center justify-center p-4">
            <RegisterForm onSubmit={handleRegister} onLoginClick={() => navigate('/login')} />
        </div>
    );
}
