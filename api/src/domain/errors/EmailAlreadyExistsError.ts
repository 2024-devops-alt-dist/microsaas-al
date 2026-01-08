export class EmailAlreadyExistsError extends Error {
    status: number;
    constructor(message: string = 'Email already in use') {
        super(message);
        this.status = 409;
    }
}
