import { Role } from "../constants/roles";

export interface User {
    id?: number;
    email: string;
    password: string;
    username: string;
    firstname?: string;
    lastname?: string;
    role?: Role;
    created_at?: Date;
    updated_at?: Date;
}