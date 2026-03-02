import { Edibility } from '../constant/edibility.js';
import { Observation } from './Observation.js';
import { Image } from './Image.js';

export class Mushroom {
    constructor(
        public id: number,
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
        public images: Image[],
    ) {}
}
