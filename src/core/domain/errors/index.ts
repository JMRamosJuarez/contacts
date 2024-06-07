import AppError, { AppErrorType } from '@core/domain/entities/app_error';

export type GenericError = unknown | Error | AppError;

export const instanceOfAppError = (error: GenericError): error is AppError => {
  return (
    error !== null &&
    error !== undefined &&
    typeof error === 'object' &&
    'name' in error &&
    error.name === 'AppError' &&
    'type' in error
  );
};

export const instanceOfError = (error: GenericError): error is Error => {
  if (error && typeof error === 'object') {
    return 'name' in error && 'message' in error && 'stack' in error;
  }
  return false;
};

export const parseAppError = (error: GenericError): AppError => {
  if (instanceOfAppError(error)) {
    return error;
  }

  if (instanceOfError(error)) {
    return new AppError(AppErrorType.UNEXPECTED_ERROR, error.message);
  }

  return new AppError(AppErrorType.UNKNOWN_ERROR);
};
