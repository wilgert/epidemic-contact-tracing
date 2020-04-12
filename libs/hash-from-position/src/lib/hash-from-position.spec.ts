import { hashFromPosition } from './hash-from-position';
import {
  plusCode
} from '../../../plus-code/src';
import { dummyCoords, dummyPosition } from '../../../location/src';
import { hash } from '../../../hash/src';

describe('featureCalculateHash', () => {

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
    })

    it('calls the plusCode lib with the latitude and longitude', () => {
      hashFromPosition(dummyPosition);
      expect(plusCode).toHaveBeenCalledWith(dummyPosition.coords.latitude, dummyPosition.coords.longitude);
    });

    it('calls the hash lib with plusCode and timestamp rounded up to 100s', () => {
      const dummyPlusCode = 'dummyPlusCode';
      (plusCode as jest.Mock).mockReturnValue(dummyPlusCode);
      hashFromPosition({...dummyPosition, timestamp: 1586705953});
      expect(hash).toHaveBeenCalledWith(`${dummyPlusCode}${1586705900}`);
    });
  });

  describe('without mocks', () => {
    it('returns the right hash', () => {
      expect(hashFromPosition(dummyPosition)).toEqual('f786a646888a9a6140f6fb6be1df56197b407c9e60d80eeb47a28a479440f48c');
    });

    it('returns the same hash for timestamps within 100s', () => {
      const positionWithTimestamp1 = { coords: dummyCoords, timestamp: 1586704900 } as Position;
      const positionWithTimestamp2 = { coords: dummyCoords, timestamp: 1586704999 } as Position;
      expect(hashFromPosition(positionWithTimestamp1)).toEqual(hashFromPosition(positionWithTimestamp2));
    });

    it('returns a different hash for timestamps longer than 100s apart', () => {
      const positionWithTimestamp1 = { coords: dummyCoords, timestamp: 1586704899 } as Position;
      const positionWithTimestamp2 = { coords: dummyCoords, timestamp: 1586704999 } as Position;
      expect(hashFromPosition(positionWithTimestamp1)).not.toEqual(hashFromPosition(positionWithTimestamp2));
    });
  });
});
