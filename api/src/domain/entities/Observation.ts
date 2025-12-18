import { ConfidenceLevel } from '../constant/confidenceLevel';
import { Comment } from './Comment';
import { Photo } from './Photo';

export class Observation {
    constructor(
        public id: number | null,
        public title: string,
        public date: Date,
        public location: {
            latitude: number;
            longitude: number;
        },
        public quantity: number,
        public notes: string | null,
        public isPublic: boolean,
        public confidenceLevel: ConfidenceLevel,
        public createdAt: Date | null,
        public updatedAt: Date | null,
        public userId: number,
        public mushroomId: number | null,
        public photos: Photo[],
        public comments: Comment[]
    ) {}
}
