export class SMTPError extends Error {
  public override readonly name = 'SMTPError';

  constructor(
    message: string,
    public readonly cause?: unknown,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
  }

  /**
   * Helper to identify if an error is an SMTPError
   */
  public static isSMTPError(error: unknown): error is SMTPError {
    return error instanceof SMTPError;
  }
}
