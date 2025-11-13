import { useEffect, useState } from 'react';
import { mockApi } from '../../services/mushroomsService';
import type { Mushroom } from '../../types/mushrooms';
import MushroomCard from '../MushroomCard/MushroomCard';

export default function MushroomsList() {
    const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);

    useEffect(() => {
        mockApi.getAll().then((data) => setMushrooms(data));
    });

    return (
        <div className="flex justify-center flex-wrap p-10 gap-6">
            {mushrooms.map((m: Mushroom) => (
                <MushroomCard key={m.id} mushroom={m} />
            ))}
        </div>
    );
}
