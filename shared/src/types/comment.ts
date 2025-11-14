import { Status } from "../constants/status";

export interface Comment {
    id?: number;
    content: string;
    status: Status;
    userId: number;
    observationId: number;
    createdAt?: Date;
    updatedAt?: Date;
}