import { useEffect, useState } from 'react';
import { mushroomsService } from '../../../../shared/services/mushroomsService';
import type { Mushroom } from '../../../../shared/types/mushrooms';
import MushroomCard from '../MushroomCard/MushroomCard';
import { imagesService } from '../../../../shared/services/imagesService';
import { Image } from '../../../../shared/types/images';

export default function MushroomsList() {
    const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        mushroomsService.getAll().then((data) => setMushrooms(data));
        imagesService.getAll().then((data) => setImages(data));
    }, []);

    return (
        <div className="flex justify-center flex-wrap p-10 gap-6">
            {mushrooms.map((m: Mushroom) => {
                const image = images.find((img) => img.mushroomId === m.id);
                return <MushroomCard key={m.id} mushroom={m} imageUrl={image ? image.url : ''} />;
            })}
        </div>
    );
}
