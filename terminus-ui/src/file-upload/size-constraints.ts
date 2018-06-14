
/**
 * An indiviual size constraint
 */
export interface TsFileUploadSizeConstraint {
  height: {
    min: number;
    max: number;
  };
  width: {
    min: number;
    max: number;
  };
}

/**
 * An array of file size constraints
 */
export type TsFileUploadSizeConstraints = TsFileUploadSizeConstraint[];
