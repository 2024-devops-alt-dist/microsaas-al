import { Edibility } from '../../../../src/domain/constant/edibility';

export const mockMushroom1 = {
    id: 1,
    commonName: 'Fly Agaric',
    species: 'Amanita muscaria',
    genus: 'Amanita',
    family: 'Amanitaceae',
    edibility: Edibility.POISONOUS,
    habitat: 'forests',
    description: 'A distinctive mushroom with a bright red cap and white spots.',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-01T00:00:00Z'),
    observations: [],
    images: [],
};

export const mockMushroom2 = {
    id: 2,
    commonName: 'Boletus edulis',
    species: 'Boletus edulis',
    genus: 'Boletus',
    family: 'Boletaceae',
    edibility: Edibility.EDIBLE,
    habitat: 'woodlands',
    description: 'A highly prized edible mushroom with a thick stem and brown cap.',
    createdAt: new Date('2023-02-01T00:00:00Z'),
    updatedAt: new Date('2023-02-01T00:00:00Z'),
    observations: [],
    images: [],
};
