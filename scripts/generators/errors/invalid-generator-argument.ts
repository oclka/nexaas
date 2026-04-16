export class InvalidGeneratorArgumentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidGeneratorArgumentError';
    }
}
