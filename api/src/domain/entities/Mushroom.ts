import { Edibility } from '../constant/edibility';
import { Observation } from './Observation';
import { Photo } from './Photo';

export class Mushroom {
    constructor(
        public id: number | null,
        public commonName: string,
        public species: string,
        public genus: string,
        public family: string,
        public edibility: Edibility,
        public habitat: string | null,
        public description: string | null,
        public createdAt: Date | null,
        public updatedAt: Date | null,
        public observations: Observation[],
        public photos: Photo[],
    ) {}
}
