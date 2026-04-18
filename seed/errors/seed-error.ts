export class SeedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "SeedError";

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, SeedError.prototype);
  }
}
