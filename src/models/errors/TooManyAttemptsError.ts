class TooManyAttemptsError extends Error {
  code = 429;
  name = 'TooManyAttemptsError';
  type = 'system';

  constructor(message = 'Too many requests') {
    super(message)
  }

  serialize() {
    return {message: this.message}
  }
}

export default TooManyAttemptsError
