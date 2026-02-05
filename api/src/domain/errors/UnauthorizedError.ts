export class UnauthorizedError extends Error {
    status: number;
    constructor(message: string = 'Unauthorized') {
        super(message);
        this.status = 401;
    }
}
