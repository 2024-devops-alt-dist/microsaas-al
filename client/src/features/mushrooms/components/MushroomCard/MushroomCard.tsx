import type { Mushroom } from '../../types/mushrooms';
import EdibilityIcons from '../Edibility/EdibilityIcons';

export default function MushroomCard({ mushroom }: { mushroom: Mushroom }) {
    return (
        <div className="flex flex-col items-center p-4 w-xs text-dark-brown rounded-lg shadow-sm group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer">
            <div className="flex h-40">
                <img
                    src={`/assets/images/${mushroom.imageUrl}`}
                    className="w-full rounded-t-2xl object-cover"
                    alt={mushroom.commonName}
                    height={50}
                    width={50}
                />
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col items-start">
                    <h3 className="font-title text-xl font-bold">{mushroom.commonName}</h3>
                    <p className="font-mono">
                        <i>
                            {mushroom.genus} {mushroom.species}
                        </i>
                    </p>
                </div>
                <EdibilityIcons edibility={mushroom.edibility} />
            </div>
            <div className="w-full">
                <div>
                    <p className="text-sm font-semibold">Habitat</p>
                    <p className="text-sm">{mushroom.habitat}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Description</p>
                    <p className="text-sm">{mushroom.description}</p>
                </div>
            </div>
        </div>
    );
}
