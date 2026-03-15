import { Request, Response, NextFunction } from 'express';
import { FindAllObservations } from '../../usecases/observation/findAllObservations.js';
import { FindObservationById } from '../../usecases/observation/findObservationById.js';
import { CreateObservation } from '../../usecases/observation/createObservation.js';
import { UpdateObservation } from '../../usecases/observation/updateObservation.js';
import { DeleteObservation } from '../../usecases/observation/deleteObservation.js';

export class ObservationController {
    constructor(
        private findAllObservationUseCase: FindAllObservations,
        private findObservationByIdUseCase: FindObservationById,
        private createObservationUseCase: CreateObservation,
        private updateObservationUseCase: UpdateObservation,
        private deleteObservationUseCase: DeleteObservation,
    ) {}

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const observations = await this.findAllObservationUseCase.execute();
            res.status(200).send(observations);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const observation = await this.findObservationByIdUseCase.execute(
                Number(req.params.id),
            );
            if (observation) res.status(200).send(observation);
            else res.status(404).send({ message: 'Observation not found' });
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newObservation = await this.createObservationUseCase.execute(req.body);
            res.status(201).send(newObservation);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updateObservation = await this.updateObservationUseCase.execute(
                Number(req.params.id),
                req.body,
            );
            res.status(200).send(updateObservation);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.deleteObservationUseCase.execute(Number(req.params.id));
            res.status(204).send({ message: 'Observation deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}
