import 'dotenv/config';
import usersData from './fixtures/users.json';
import mushroomsData from './fixtures/mushrooms.json';
import observationsData from './fixtures/observations.json';
import commentsData from './fixtures/comments.json';
import photosData from './fixtures/photos.json';
import { prisma } from './prisma';

async function main() {
    for (const user of usersData) {
        await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
            },
        });
    }

    for (const mushroom of mushroomsData) {
        await prisma.mushroom.create({
            data: {
                commonName: mushroom.commonName,
                species: mushroom.species,
                genus: mushroom.genus,
                family: mushroom.family,
                edibility:
                    mushroom.edibility === 'EDIBLE'
                        ? 'EDIBLE'
                        : mushroom.edibility === 'POISONOUS'
                          ? 'POISONOUS'
                          : 'UNKNOWN',
                habitat: mushroom.habitat,
                description: mushroom.description,
            },
        });
    }

    for (const observation of observationsData) {
        await prisma.observation.create({
            data: {
                title: observation.title,
                date: new Date(observation.date),
                latitude: observation.latitude,
                longitude: observation.longitude,
                quantity: observation.quantity,
                notes: observation.notes,
                isPublic: observation.isPublic,
                confidenceLevel:
                    observation.confidenceLevel === 'CERTAIN'
                        ? 'CERTAIN'
                        : observation.confidenceLevel === 'PROBABLE'
                          ? 'PROBABLE'
                          : observation.confidenceLevel === 'POSSIBLE'
                            ? 'POSSIBLE'
                            : 'UNKNOWN',
                userId: observation.userId,
                mushroomId: observation.mushroomId,
            },
        });
    }

    for (const comment of commentsData) {
        await prisma.comment.create({
            data: {
                content: comment.content,
                status:
                    comment.status === 'APPROVED'
                        ? 'APPROVED'
                        : comment.status === 'REJECTED'
                          ? 'REJECTED'
                          : comment.status === 'SUBMITTED'
                            ? 'SUBMITTED'
                            : 'DRAFT',
                createdAt: new Date(comment.createdAt),
                updatedAt: new Date(comment.updatedAt),
                userId: comment.userId,
                observationId: comment.observationId,
            },
        });
    }

    for (const photo of photosData) {
        await prisma.photo.create({
            data: {
                url: photo.url,
                filename: photo.filename,
                mimeType: photo.mimeType,
                size: photo.size,
                createdAt: new Date(photo.createdAt),
                updatedAt: new Date(photo.updatedAt),
                observationId: photo.observationId,
                mushroomId: photo.mushroomId,
            },
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
