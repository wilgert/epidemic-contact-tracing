import { hash } from '@epidemic-contact-tracing/hash';
import { dummyCoords, dummyPosition } from '@epidemic-contact-tracing/location';
import { plusCode } from '@epidemic-contact-tracing/plus-code';

import { hashFromPosition } from './hash-from-position';

describe('hashFromPosition', () => {
  const timestampGranularityInSeconds = 10;

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
      hashFromPosition(dummyPosition, timestampGranularityInSeconds);
      expect(plusCode).toHaveBeenCalledWith(
        dummyPosition.coords.latitude,
        dummyPosition.coords.longitude
      );
    });

    it(`calls the hash lib with plusCode and timestamp rounded up to ${timestampGranularityInSeconds}s`, () => {
      const dummyPlusCode = 'dummyPlusCode';
      (plusCode as jest.Mock).mockReturnValue(dummyPlusCode);
      hashFromPosition({ ...dummyPosition, timestamp: 1586705953 }, timestampGranularityInSeconds);
      expect(hash).toHaveBeenCalledWith(`${dummyPlusCode}${1586700}`);
    });
  });

  describe('without mocks', () => {
    it('returns the right hash', () => {
      expect(hashFromPosition(dummyPosition, timestampGranularityInSeconds)).toEqual(
        'ddb9913cd7721305ffc09486b0e0fcdf2ae7bd200d5e17e5204c57937da586c4'
      );
    });

    it(`returns the same hash for timestamps within ${timestampGranularityInSeconds}s`, () => {
      const timestamp1 = 1586700000;
      const timestamp2 = 1586700000 + timestampGranularityInSeconds * 1000 - 1;
      const positionWithTimestamp1 = {
        coords: dummyCoords,
        timestamp: timestamp1
      } as Position;
      const positionWithTimestamp2 = {
        coords: dummyCoords,
        timestamp: timestamp2
      } as Position;
      expect(hashFromPosition(positionWithTimestamp1, timestampGranularityInSeconds)).toEqual(
        hashFromPosition(positionWithTimestamp2, timestampGranularityInSeconds)
      );
    });

    it(`returns a different hash for timestamps longer than ${timestampGranularityInSeconds}s apart`, () => {
      const timestamp1 = 1586700000;
      const timestamp2 = 1586700000 + timestampGranularityInSeconds * 1000
      const positionWithTimestamp1 = {
        coords: dummyCoords,
        timestamp: timestamp1
      } as Position;
      const positionWithTimestamp2 = {
        coords: dummyCoords,
        timestamp: timestamp2
      } as Position;
      expect(hashFromPosition(positionWithTimestamp1, timestampGranularityInSeconds)).not.toEqual(
        hashFromPosition(positionWithTimestamp2, timestampGranularityInSeconds)
      );
    });
  });
});
