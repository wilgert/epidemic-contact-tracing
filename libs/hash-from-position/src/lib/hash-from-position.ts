import { hash } from '@epidemic-contact-tracing/hash';
import { plusCode } from '@epidemic-contact-tracing/plus-code';

export const timestampGranularityInSeconds = 100;

export function hashFromPosition({
  coords: { latitude, longitude },
  timestamp
}: Position): string {
  const plusCodeResult: string = plusCode(latitude, longitude);
  const timestampInSeconds = timestamp / 1000;
  const roundedTimestamp =
    Math.floor(timestampInSeconds / timestampGranularityInSeconds) *
    timestampGranularityInSeconds;
  const hashResult: string = hash(`${plusCodeResult}${roundedTimestamp}`);

  return hashResult;
}
