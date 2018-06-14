export type TsFileAcceptedMimeTypes
  = 'text/csv'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/png'
;

// TODO: Not using type here because it was yelling about can't set string to type in
// dropped-file.ts
export const TS_ACCEPTED_MIME_TYPES: string[] = [
  'text/csv',
  'image/jpeg',
  'image/jpg',
  'image/png',
];
