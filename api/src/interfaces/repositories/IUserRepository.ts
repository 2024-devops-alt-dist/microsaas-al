import { User } from '../../domain/entities/User.js';
import { UserCreationType } from '../../domain/types/UserCreationType.js';

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userCreationType: UserCreationType): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}
