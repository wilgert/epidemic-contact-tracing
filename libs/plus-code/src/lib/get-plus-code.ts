import OpenLocationCode from 'open-location-code-typescript';

export function getPlusCode(latitude: number, longitude: number): string {
  return OpenLocationCode.encode(latitude, longitude);
}
