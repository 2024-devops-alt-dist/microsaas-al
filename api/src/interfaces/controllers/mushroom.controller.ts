import { Request, Response, NextFunction } from 'express';
import { FindAllMushrooms } from '../../usecases/mushroom/findAllMushrooms.js';
import { FindMushroomById } from '../../usecases/mushroom/findMushroomById.js';
import { CreateMushroom } from '../../usecases/mushroom/createMushroom.js';
import { UpdateMushroom } from '../../usecases/mushroom/updateMushroom.js';
import { DeleteMushroom } from '../../usecases/mushroom/deleteMushroom.js';

export class MushroomController {
    constructor(
        private findAllMushroomUseCase: FindAllMushrooms,
        private findMushroomByIdUseCase: FindMushroomById,
        private createMushroomUseCase: CreateMushroom,
        private updateMushroomUseCase: UpdateMushroom,
        private deleteMushroomUseCase: DeleteMushroom,
    ) {}

    findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const mushrooms = await this.findAllMushroomUseCase.execute();
            res.status(200).send(mushrooms);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const mushroom = await this.findMushroomByIdUseCase.execute(Number(req.params.id));
            if (mushroom) res.status(200).send(mushroom);
            else res.status(404).send({ message: 'Mushroom not found' });
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newMushroom = await this.createMushroomUseCase.execute(req.body);
            res.status(201).send(newMushroom);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updateMushroom = await this.updateMushroomUseCase.execute(
                Number(req.params.id),
                req.body,
            );
            res.status(200).send(updateMushroom);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.deleteMushroomUseCase.execute(Number(req.params.id));
            res.status(200).send({ message: 'Mushroom deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}
