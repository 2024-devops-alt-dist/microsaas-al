import { useEffect, useState } from 'react';
import { mockApi } from '../../services/observationsService';
import type { Observation } from '../../types/observation';
import ObservationCard from '../ObservationsCard/ObservationCard';

export default function ObservationList() {
    const [observations, setObservation] = useState<Observation[]>([]);

    useEffect(() => {
        mockApi.getAll().then((data) => setObservation(data));
    });

    return (
        <div className="flex justify-center flex-wrap gap-3">
            {observations.map((o: Observation) => (
                <ObservationCard key={o.id} obs={o} />
            ))}
        </div>
    );
}
