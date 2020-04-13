import { hash } from '@epidemic-contact-tracing/hash';
import { dummyCoords, dummyPosition } from '@epidemic-contact-tracing/location';
import { plusCode } from '@epidemic-contact-tracing/plus-code';

import { hashFromPosition } from './hash-from-position';

describe('hashFromPosition', () => {
  describe('with mocks', () => {
    let originalPlusCode;
    let originalHash;

    beforeEach(() => {
      originalPlusCode = plusCode;
      // @ts-ignore
      plusCode = jest.fn();

      originalHash = hash;
      // @ts-ignore
      hash = jest.fn();
    });

    afterEach(() => {
      // @ts-ignore
      hash = originalHash;
      // @ts-ignore
      plusCode = originalPlusCode;
    });

    it('calls the plusCode lib with the latitude and longitude', () => {
      hashFromPosition(dummyPosition);
      expect(plusCode).toHaveBeenCalledWith(
        dummyPosition.coords.latitude,
        dummyPosition.coords.longitude
      );
    });

    it('calls the hash lib with plusCode and timestamp rounded up to 100s', () => {
      const dummyPlusCode = 'dummyPlusCode';
      (plusCode as jest.Mock).mockReturnValue(dummyPlusCode);
      hashFromPosition({ ...dummyPosition, timestamp: 1586705953 });
      expect(hash).toHaveBeenCalledWith(`${dummyPlusCode}${1586700}`);
    });
  });

  describe('without mocks', () => {
    it('returns the right hash', () => {
      expect(hashFromPosition(dummyPosition)).toEqual(
        '7a86d4b6de5e86125dca6472b4637867956d57849942c6341c55078978d1861a'
      );
    });

    it('returns the same hash for timestamps within 100s', () => {
      const positionWithTimestamp1 = {
        coords: dummyCoords,
        timestamp: 1586700000
      } as Position;
      const positionWithTimestamp2 = {
        coords: dummyCoords,
        timestamp: 1586799999
      } as Position;
      expect(hashFromPosition(positionWithTimestamp1)).toEqual(
        hashFromPosition(positionWithTimestamp2)
      );
    });

    it('returns a different hash for timestamps longer than 100s apart', () => {
      const positionWithTimestamp1 = {
        coords: dummyCoords,
        timestamp: 1586700000
      } as Position;
      const positionWithTimestamp2 = {
        coords: dummyCoords,
        timestamp: 1586800000
      } as Position;
      expect(hashFromPosition(positionWithTimestamp1)).not.toEqual(
        hashFromPosition(positionWithTimestamp2)
      );
    });
  });
});
