import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
    onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
    onRegisterClick?: () => void;
}

export default function LoginForm({ onSubmit, onRegisterClick }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSubmit({ email, password });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col bg-white text-dark-brown rounded-xl shadow-md overflow-hidden max-w-sm w-full">
            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Email */}
                <div className="p-4 bg-gray-50">
                    <label htmlFor="login-email" className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Email
                    </label>
                    <div className="relative">
                        <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Mot de passe */}
                <div className="p-4 border-b border-gray-100">
                    <label htmlFor="login-password" className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Mot de passe
                    </label>
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Erreur */}
                {error && <div className="px-4 py-2 bg-red-50 text-red-600 text-sm">{error}</div>}

                {/* Actions */}
                <div className="p-4 flex flex-col gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-lime-700 text-white font-semibold rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>

                    {onRegisterClick && (
                        <p className="text-center text-sm text-gray-600">
                            Pas encore de compte ?{' '}
                            <button
                                type="button"
                                onClick={onRegisterClick}
                                className="text-lime-700 hover:underline font-semibold"
                            >
                                S'inscrire
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
