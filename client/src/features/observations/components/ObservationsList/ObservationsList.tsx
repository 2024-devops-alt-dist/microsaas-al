import { useEffect, useState } from 'react';
import ObservationCard from '../ObservationsCard/ObservationCard';
import { Image } from '../../../../shared/types/images';
import { observationsService } from '../../../../shared/services/observationsService';
import { Observation } from '../../../../shared/types/observations';
import { imagesService } from '../../../../shared/services/imagesService';

export default function ObservationList() {
    const [observations, setObservation] = useState<Observation[]>([]);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        observationsService.getAll().then((data) => setObservation(data));
        imagesService.getAll().then((data) => setImages(data));
    }, []);

    return (
        <div className="flex justify-center flex-wrap gap-3">
            {observations.map((o: Observation) => {
                const image = images.find((img) => img.observationId === o.id);
                return <ObservationCard key={o.id} obs={o} imageUrl={image?.url} />;
            })}
        </div>
    );
}
