import type { Mushroom } from '../../../../shared/types/mushrooms';
import EdibilityIcons from '../Edibility/EdibilityIcons';

export default function MushroomCard({
    mushroom,
    imageUrl,
}: {
    mushroom: Mushroom;
    imageUrl: string;
}) {
    return (
        <div className="flex flex-col bg-white text-dark-brown rounded-xl shadow-md overflow-hidden max-w-sm w-full">
            {/* Image principale */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={`/assets/images/${imageUrl}`}
                    className="w-full h-full object-cover"
                    alt={mushroom.commonName}
                />
            </div>

            {/* En-tête */}
            <div className="flex justify-between p-4 border-b border-gray-100">
                <div>
                    <h2 className="font-title text-2xl font-bold">{mushroom.commonName}</h2>
                    <p className="font-mono text-gray-600 italic">{mushroom.species}</p>
                </div>
                <div className="">
                    <EdibilityIcons edibility={mushroom.edibility} />
                </div>
            </div>

            {/* Taxonomie */}
            <div className="p-4 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Taxonomie</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <span className="font-semibold">Genre:</span>
                        <span className="ml-1">{mushroom.genus}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Famille:</span>
                        <span className="ml-1">{mushroom.family}</span>
                    </div>
                </div>
            </div>

            {/* Habitat */}
            {mushroom.habitat && (
                <div className="p-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Habitat</h3>
                    <p className="text-sm text-gray-700">{mushroom.habitat}</p>
                </div>
            )}

            {/* Description */}
            {mushroom.description && (
                <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                        Description
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-3">{mushroom.description}</p>
                </div>
            )}
        </div>
    );
}
