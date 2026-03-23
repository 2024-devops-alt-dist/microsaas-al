import { Observation } from './observations';

export interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
    role: Role;
    createdAt: Date | null;
    updatedAt: Date | null;
    observations: Observation[];
    comments: Comment[];
}

export type CreateUserDTO = Omit<
    User,
    'id' | 'createdAt' | 'updatedAt' | 'observations' | 'comments'
>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface AuthenticatedUser {
    id: number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
}
