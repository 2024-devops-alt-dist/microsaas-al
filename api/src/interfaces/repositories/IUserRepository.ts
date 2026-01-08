import { User } from '../../domain/entities/User.js';

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}
