/**
 * Coerce the type to DragEvent
 *
 * @param x - The item to test
 * @return True if the value is a DragEvent
 */
export function isDragEvent(x: any): x is DragEvent {
  return x.dataTransfer !== undefined;
}
