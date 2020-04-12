import { plusCode } from '../../../plus-code/src';
import { hash } from '../../../hash/src';

export function hashFromPosition({ coords: { latitude, longitude }, timestamp }: Position): string {
  const plusCodeResult: string = plusCode(latitude, longitude);
  const timestampInSeconds = timestamp/1000;
  const roundedTimestamp = Math.floor(timestampInSeconds / 100) * 100;
  const hashResult: string = hash(`${plusCodeResult}${roundedTimestamp}`)

  return hashResult;
}
