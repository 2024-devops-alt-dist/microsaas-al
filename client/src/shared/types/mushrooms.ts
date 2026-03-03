export interface Mushroom {
    id: number;
    imageUrl: string;
    commonName: string;
    genus: string;
    species: string;
    family: string;
    edibility: string;
    habitat: string;
    description?: string;
}

export type CreateMushroomDTO = Omit<Mushroom, 'id'>;
export type UpdateMushroomDTO = Partial<CreateMushroomDTO>;
