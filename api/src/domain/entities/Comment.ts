import { Status } from '../constant/status';

export class Comment {
    constructor(
        public id: number | null,
        public content: string,
        public status: Status,
        public createdAt: Date | null,
        public updatedAt: Date | null,
        public userId: number,
        public observationId: number,
    ) {}
}
