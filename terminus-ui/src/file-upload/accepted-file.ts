export class TsAcceptedFile {

  constructor(
    private acceptedFile: File,
  ) {}

  public get file(): File {
    return this.acceptedFile;
  }

}
