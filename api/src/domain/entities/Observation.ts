import { ConfidenceLevel } from '../constant/confidenceLevel.js';
import { Comment } from './Comment.js';
import { Image } from './Image.js';

export class Observation {
    constructor(
        public id: number | null,
        public title: string,
        public date: Date,
        public latitude: number,
        public longitude: number,
        public quantity: number,
        public notes: string | null,
        public isPublic: boolean,
        public confidenceLevel: ConfidenceLevel,
        public createdAt: Date | null,
        public updatedAt: Date | null,
        public userId: number,
        public mushroomId: number | null,
        public images: Image[],
        public comments: Comment[],
    ) {}
}
