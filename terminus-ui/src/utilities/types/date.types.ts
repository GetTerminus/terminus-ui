/**
 * Define the allowed date formats for the {@link TsDatePipe}.
 */
export type TsDateTypes =
  // 02/08/2018
  'short'
  // February 8th, 2018
  | 'medium'
  // Thursday, February 8th, 2018, 12:00:00am
  | 'extended'
  // 2018-02-08T05:00:00.000Z
  | 'timestamp'
;
