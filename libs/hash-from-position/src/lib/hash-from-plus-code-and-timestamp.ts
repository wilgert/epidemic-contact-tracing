import { hash } from '@epidemic-contact-tracing/hash';

export function hashFromPlusCodeAndTimestamp({
  plusCode,
  timestamp,
  timestampGranularityInSeconds
}): string {
  const timestampInSeconds = timestamp / 1000;
  const roundedTimestamp =
    Math.floor(timestampInSeconds / timestampGranularityInSeconds) *
    timestampGranularityInSeconds;
  const hashResult: string = hash(`${plusCode}${roundedTimestamp}`);

  return hashResult;
}
