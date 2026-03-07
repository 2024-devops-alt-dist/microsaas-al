import { TbSearch, TbFilter } from 'react-icons/tb';
import { GiMushrooms } from 'react-icons/gi';
import { useState } from 'react';
import MushroomsList from '../components/MushroomsList/MushroomsList';

export default function MushroomsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* En-tête */}
            <section className="bg-white border-b border-gray-200 px-6 py-10">
                <div className="max-w-4xl mx-auto text-center">
                    <GiMushrooms className="text-lime-700 mx-auto mb-4" size={48} />
                    <h1 className="font-title text-3xl font-bold text-gray-900 mb-2">
                        Encyclopédie des champignons
                    </h1>
                    <p className="text-gray-600">
                        Explorez notre base de données d'espèces pour identifier vos trouvailles
                    </p>
                </div>
            </section>

            {/* Barre de recherche et filtres */}
            <section className="px-6 py-6">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <TbSearch
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Rechercher un champignon..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                        <TbFilter size={18} />
                        Filtres
                    </button>
                </div>
            </section>

            {/* Liste des champignons */}
            <section className="px-6 pb-12">
                <div className="max-w-4xl mx-auto">
                    <MushroomsList />
                </div>
            </section>
        </div>
    );
}
