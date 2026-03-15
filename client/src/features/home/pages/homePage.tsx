import { NavLink } from 'react-router-dom';
import { TbNotes, TbMushroom, TbPlus, TbSearch, TbLeaf, TbMapPin } from 'react-icons/tb';
import { GiMushrooms } from 'react-icons/gi';
import { useAuth } from '../../auth/hooks/useAuth';

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-100 to-white">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center px-6 py-16 text-center md:py-24">
                <GiMushrooms className="text-lime-700 mb-6" size={80} />
                <h1 className="font-title text-4xl font-bold text-black mb-4 md:text-5xl">
                    ChampiNotes
                </h1>
                <p className="text-black text-lg max-w-md mb-8">
                    Documentez vos découvertes mycologiques, identifiez les espèces et partagez vos
                    observations.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                    {isAuthenticated ? (
                        <NavLink
                            to="/observations/new"
                            className="flex items-center gap-2 bg-lime-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-lime-800 transition-colors"
                        >
                            <TbPlus size={20} />
                            Nouvelle observation
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/register"
                            className="flex items-center gap-2 bg-lime-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-lime-800 transition-colors"
                        >
                            Commencer gratuitement
                        </NavLink>
                    )}
                    <NavLink
                        to="/observations"
                        className="flex items-center gap-2 border-2 border-lime-700 text-lime-700 px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                        <TbSearch size={20} />
                        Explorer
                    </NavLink>
                </div>
            </section>

            {/* Fonctionnalités */}
            <section className="px-6 py-12 bg-white">
                <h2 className="font-title text-2xl font-bold text-center text-dark-brown mb-10">
                    Fonctionnalités
                </h2>
                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto md:grid-cols-3">
                    <FeatureCard
                        icon={<TbNotes size={40} />}
                        title="Fiches d'observation"
                        description="Créez des fiches détaillées avec photos, localisation et caractéristiques."
                    />
                    <FeatureCard
                        icon={<TbMushroom size={40} />}
                        title="Base de données"
                        description="Accédez à une bibliothèque d'espèces pour identifier vos trouvailles."
                    />
                    <FeatureCard
                        icon={<TbMapPin size={40} />}
                        title="Géolocalisation"
                        description="Enregistrez les coordonnées GPS de vos spots de cueillette."
                    />
                </div>
            </section>

            {/* Statistiques */}
            <section className="px-6 py-12 bg-gray-100">
                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto md:grid-cols-4">
                    <StatCard value="150+" label="Espèces" />
                    <StatCard value="500+" label="Observations" />
                    <StatCard value="50+" label="Utilisateurs" />
                    <StatCard value="100%" label="Gratuit" />
                </div>
            </section>

            {/* Call to Action */}
            {!isAuthenticated && (
                <section className="px-6 py-16 text-center">
                    <TbLeaf className="text-lime-700 mx-auto mb-4" size={48} />
                    <h2 className="font-title text-2xl font-bold text-dark-brown mb-4">
                        Prêt à explorer ?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Rejoignez la communauté et commencez à documenter vos découvertes.
                    </p>
                    <NavLink
                        to="/register"
                        className="inline-block bg-lime-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
                    >
                        Créer un compte
                    </NavLink>
                </section>
            )}
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-xl">
            <div className="text-lime-700 mb-4">{icon}</div>
            <h3 className="font-semibold text-dark-brown mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
}

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <p className="font-title text-3xl font-bold text-lime-700">{value}</p>
            <p className="text-gray-600 text-sm">{label}</p>
        </div>
    );
}
