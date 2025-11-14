import { Edibility } from "../constants/edibility";

export interface Mushroom {
    id?: string;
    commonName: string;
    species: string;
    genus: string;
    family: string;
    edibility: Edibility;
    habitat?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}