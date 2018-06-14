import { TsFileRejectionReasons } from './file-rejection-reasons.enum';


export class TsRejectedFile {

  constructor(
    private rejectedFile: File,
    private reason: TsFileRejectionReasons,
  ) {}


  public get file(): File {
    return this.rejectedFile;
  }

  public get rejectionReason(): TsFileRejectionReasons {
    return this.reason;
  }

}
