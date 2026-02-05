import { User } from '../../domain/entities/User.js';
import { UserCreationPayload } from '../../domain/types/UserCreationPayload.js';

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userCreationPayload: UserCreationPayload): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}
