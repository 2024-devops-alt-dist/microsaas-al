import { Role } from '../constant/role';
import { Comment } from './Comment';
import { Observation } from './Observation';

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
