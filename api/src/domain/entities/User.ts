import { Role } from '../constant/role.js';
import { Comment } from './Comment.js';
import { Observation } from './Observation.js';

export class User {
    constructor(
        public id: number | null,
        public email: string,
        public password: string,
        public username: string,
        public firstname: string,
        public lastname: string,
        public role: Role,
        public createdAt: Date | null,
        public updatedAt: Date | null,
        public observations: Observation[],
        public comments: Comment[],
    ) {}
}
