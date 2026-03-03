import { Observation, ConfidenceLevel } from '../../../../shared/types/observations';
import { MapPin, Calendar, Eye, EyeOff, Hash } from 'lucide-react';

interface ObservationCardProps {
    obs: Observation;
    imageUrl?: string;
    mushroomName?: string;
}

function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
    const config = {
        [ConfidenceLevel.HIGH]: { label: 'Élevé', color: 'bg-green-500' },
        [ConfidenceLevel.MEDIUM]: { label: 'Moyen', color: 'bg-yellow-500' },
        [ConfidenceLevel.LOW]: { label: 'Faible', color: 'bg-red-500' },
    };
    const { label, color } = config[level];

    return (
        <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${color}`}>
            {label}
        </span>
    );
}

export default function ObservationCard({ obs, imageUrl, mushroomName }: ObservationCardProps) {
    return (
        <div className="flex flex-col bg-white text-dark-brown rounded-xl shadow-md overflow-hidden max-w-sm w-full">
            {/* Image principale */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageUrl ? `/assets/images/${imageUrl}` : '/assets/images/placeholder.jpg'}
                    className="w-full h-full object-cover"
                    alt={obs.title}
                />
                {/* Badges superposés */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <ConfidenceBadge level={obs.confidenceLevel} />
                </div>
                <div className="absolute top-3 right-3">
                    {obs.isPublic ? (
                        <span className="flex items-center gap-1 px-2 py-1 text-xs bg-white/90 rounded-full">
                            <Eye size={14} /> Public
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 text-white rounded-full">
                            <EyeOff size={14} /> Privé
                        </span>
                    )}
                </div>
            </div>

            {/* En-tête */}
            <div className="p-4 border-b border-gray-100">
                <h2 className="font-title text-xl font-bold">{obs.title}</h2>
                {mushroomName && (
                    <p className="font-mono text-gray-600 italic text-sm">{mushroomName}</p>
                )}
            </div>

            {/* Informations */}
            <div className="p-4 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Informations</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{new Date(obs.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Hash size={16} className="text-gray-400" />
                        <span>Qté: {obs.quantity}</span>
                    </div>
                </div>
            </div>

            {/* Localisation */}
            <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Localisation</h3>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin size={16} className="text-gray-400" />
                    <span>
                        {obs.latitude.toFixed(4)}, {obs.longitude.toFixed(4)}
                    </span>
                </div>
            </div>

            {/* Notes */}
            {obs.notes && (
                <div className="p-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Notes</h3>
                    <p className="text-sm text-gray-700 line-clamp-3">{obs.notes}</p>
                </div>
            )}

            {/* Métadonnées */}
            <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
                {obs.createdAt && (
                    <span>Créé le {new Date(obs.createdAt).toLocaleDateString('fr-FR')}</span>
                )}
            </div>
        </div>
    );
}
