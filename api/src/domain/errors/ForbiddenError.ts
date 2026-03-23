export class ForbiddenError extends Error {
    status: number;
    constructor(message: string = 'Forbidden') {
        super(message);
        this.status = 403;
    }
}
