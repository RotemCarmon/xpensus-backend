class ConflictError extends Error {
  code = 409;
  name = 'ConflictError';
  type = 'system';

  constructor(message = 'There is a conflict with the current state of the resource.') {
    super(message);
  }

  serialize() {
    return {message: this.message}
  }
}

export default ConflictError