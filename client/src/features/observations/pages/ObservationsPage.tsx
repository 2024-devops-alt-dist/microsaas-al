import { TbFilter, TbPlus, TbSearch } from 'react-icons/tb';
import ObservationList from '../components/ObservationsList/ObservationsList';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function ObservationsPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* En-tête de la page */}
            <section className="bg-white border-b border-gray-200 px-6 py-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-title text-3xl font-bold text-gray-900 mb-2">
                        Observations
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Les dernières observations partagées par la communauté
                    </p>
                    <NavLink
                        to="/observations/new"
                        className="inline-flex items-center gap-2 bg-lime-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-lime-800 transition-colors shadow-sm"
                    >
                        <TbPlus size={20} />
                        Créer une Nouvelle observation
                    </NavLink>
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
                            placeholder="Rechercher une observation..."
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

            {/* Liste des observations */}
            <section className="px-6 pb-12">
                <div className="max-w-4xl mx-auto">
                    <ObservationList />
                </div>
            </section>
        </div>
    );
}
