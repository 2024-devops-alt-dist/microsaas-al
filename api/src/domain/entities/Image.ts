export class Image {
    constructor(
        public id: number,
        public url: string,
        public filename: string,
        public mimeType: string,
        public size: number,
        public createdAt: Date | null,
        public updatedAt: Date | null,
        public observationId: number | null,
        public mushroomId: number | null,
    ) {}
}
