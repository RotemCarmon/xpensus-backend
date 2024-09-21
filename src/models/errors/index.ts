// ERROR_CODES = [:missing, :missing_field, :invalid, :already_exists, :duplicate, :too_long, :unexpected, :unauthorized]
import BadRequestError from './BadRequestError';
import NotFoundError from './NotFoundError';
import ForbiddenError from './ForbiddenError';
import UnauthorizedError from './UnauthorizedError';
import TooManyAttemptsError from './TooManyAttemptsError';
import InternalError from './InternalError';
import RequestValidationError from './RequestValidationError';
import DataValidationError from './DataValidationError';
import ConnectionError from './ConnectionError';
import ConflictError from './ConflictError';

export default {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  InternalError,
  RequestValidationError,
  DataValidationError,
  ConnectionError,
  ConflictError,
  TooManyAttemptsError
};
