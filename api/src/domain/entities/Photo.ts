export class Photo {
    constructor(
        public id: number | null,
        public url: string,
        public filename: string,
        public mimeType: string,
        public size: number,
        public createdAt: Date | null,
        public updatedAt: Date | null,
        public observationId: number | null,
        public mushroomId: string | null,
    ) {}
}
