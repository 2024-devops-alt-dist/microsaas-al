import 'dotenv/config';
import { prisma } from './prisma.js';
import { usersData } from './fixtures/users.js';
import { mushroomsData } from './fixtures/mushrooms.js';
import { observationsData } from './fixtures/observations.js';
import { commentsData } from './fixtures/comments.js';
import { imagesData } from './fixtures/images.js';
import { hashPassword } from '../../../utils/hashPassword.js';

async function main() {
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Image" RESTART IDENTITY CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Observation" RESTART IDENTITY CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Mushroom" RESTART IDENTITY CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');

    for (const user of usersData) {
        const hashedpassword = await hashPassword(user.password);
        await prisma.user.create({
            data: {
                email: user.email,
                password: hashedpassword,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role === 'ADMIN' ? 'ADMIN' : 'USER',
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
                    observation.confidenceLevel === 'HIGH'
                        ? 'HIGH'
                        : observation.confidenceLevel === 'MEDIUM'
                          ? 'MEDIUM'
                          : 'LOW',
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

    for (const image of imagesData) {
        await prisma.image.create({
            data: {
                url: image.url,
                filename: image.filename,
                mimeType: image.mimeType,
                size: image.size,
                createdAt: new Date(image.createdAt),
                updatedAt: new Date(image.updatedAt),
                observationId: image.observationId,
                mushroomId: image.mushroomId,
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
