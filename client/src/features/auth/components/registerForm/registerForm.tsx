import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, IdCard } from 'lucide-react';

interface RegisterFormProps {
    onSubmit: (userData: {
        email: string;
        password: string;
        username: string;
        firstname: string;
        lastname: string;
    }) => Promise<void>;
    onLoginClick?: () => void;
}

export default function RegisterForm({ onSubmit, onLoginClick }: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        try {
            await onSubmit({ email, password, username, firstname, lastname });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col bg-white text-dark-brown rounded-xl shadow-md overflow-hidden max-w-sm w-full">
            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Nom d'utilisateur */}
                <div className="p-4 bg-gray-50">
                    <label htmlFor="register-username" className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Nom d'utilisateur
                    </label>
                    <div className="relative">
                        <User
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            id="register-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="johndoe"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Prénom et Nom */}
                <div className="p-4 border-b border-gray-100 grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="register-firstname" className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                            Prénom
                        </label>
                        <div className="relative">
                            <IdCard
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                id="register-firstname"
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="Prénom"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="register-lastname" className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                            Nom
                        </label>
                        <input
                            id="register-lastname"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Nom"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="p-4 bg-gray-50">
                    <label htmlFor="register-email" className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Email
                    </label>
                    <div className="relative">
                        <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            id="register-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Mot de passe */}
                <div className="p-4 border-b border-gray-100">
                    <label htmlFor="register-password" className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Mot de passe
                    </label>
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            id="register-password"
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

                {/* Confirmation mot de passe */}
                <div className="p-4 border-b border-gray-100">
                    <label htmlFor="register-confirm-password" className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Confirmer le mot de passe
                    </label>
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            id="register-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                        {loading ? 'Inscription...' : "S'inscrire"}
                    </button>

                    {onLoginClick && (
                        <p className="text-center text-sm text-gray-600">
                            Déjà un compte ?{' '}
                            <button
                                type="button"
                                onClick={onLoginClick}
                                className="text-lime-700 hover:underline font-semibold"
                            >
                                Se connecter
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
