import { NextFunction, Request, Response } from 'express';
import { FindImageById } from '../../usecases/image/findImageById.js';
import { FindObservationById } from '../../usecases/observation/findObservationById.js';

export const imageOwnerOrAdminMiddleware =
    (findImageById: FindImageById, findObservationById: FindObservationById) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const ressourceId = Number(req.params.id);

            const image = await findImageById.execute(ressourceId);
            if (!image.observationId) {
                return res.status(404).json({ message: 'Image not found' });
            }
            const observation = await findObservationById.execute(image.observationId);

            if (req.user.role !== 'ADMIN' && observation.userId !== req.user.id) {
                return res.status(403).json({ message: 'Forbidden access' });
            }

            next();
        } catch {
            return res.status(403).json({ message: 'Forbidden access' });
        }
    };
