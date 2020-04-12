import OpenLocationCode from 'open-location-code-typescript';

export function plusCode(latitude: number, longitude: number): string {
  return OpenLocationCode.encode(latitude, longitude);
}
