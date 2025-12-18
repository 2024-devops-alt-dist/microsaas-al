export interface UserResponseDto {
    id: number | null;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}
