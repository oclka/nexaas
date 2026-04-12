interface Success<T> { success: true; data: T }
interface Failure { success: false; error: string; code?: string }

export type ActionServerResult<T = void> = Success<T> | Failure;
export type SuccessResponse<T> = Omit<Success<T>, 'success'>;
export type FailureResponse = Omit<Failure, 'success'>;

export const ActionResponse = {
  success: <T = void>(data?: T): Success<T> => ({
    success: true,
    data: data as T,
  }),
  error: (error: string, code?: string): Failure => ({
    success: false,
    error,
    code,
  }),
};
