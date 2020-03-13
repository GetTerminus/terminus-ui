/**
 * Create version information from a version string
 */
export class Version {
  public readonly major: string;
  public readonly minor: string;
  public readonly patch: string;

  constructor(public full: string) {
    this.major = full.split('.')[0];
    this.minor = full.split('.')[1];
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.patch = full.split('.').slice(2).join('.');
  }
}

export const VERSION = new Version('0.0.0-PLACEHOLDER');
