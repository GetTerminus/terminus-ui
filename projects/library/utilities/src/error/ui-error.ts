/**
 * A Terminus UI specific Error
 */
export class TsUILibraryError extends Error {
  constructor(message: string) {
    super(message);
    // HACK: Set the prototype explicitly. See:
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, TsUILibraryError.prototype);
    this.message = message;
    this.name = 'TsUILibraryError';
    this.stack = (new Error(message)).stack;
  }
}
