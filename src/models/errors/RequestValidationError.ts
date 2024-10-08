class RequestValidationError extends Error {
  code = 404;
  name = 'RequestValidationError';
  type = 'system';
  errors: any[];

  constructor(errors = []) {
    super('Invalid request parameters');
    this.errors = errors;
  }

  serialize() {
    return this.errors.reduce((acc, err) => {
      acc[err.param] = err.message;
      return acc;
    }, {});
  }
}

export default RequestValidationError;
