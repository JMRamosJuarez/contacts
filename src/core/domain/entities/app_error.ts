export enum AppErrorType {
  UNKNOWN_ERROR = 'unknown_error',
  UNEXPECTED_ERROR = 'unexpected_error',
  CONTACTS_MODULE_ERROR = 'contacts_module_error',
  PERMISSION_DENIED = 'permission_denied',
  INVALID_STATE_ACCESS = 'invalid_state_access',
}

export default class AppError {
  readonly name: string = 'AppError';

  constructor(readonly type: AppErrorType, readonly message?: string) {}
}
