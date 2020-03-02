/**
 * A Terminus UI specific Error
 */
export class TsUILibraryError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'TsUILibraryError';
    this.stack = (new Error(message)).stack;
  }
}
