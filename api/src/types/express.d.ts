declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                username: string;
                firstname: string;
                lastname: string;
                role: string;
            };
        }
    }
}
export {};
