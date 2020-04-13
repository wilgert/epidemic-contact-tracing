import { hash } from '@epidemic-contact-tracing/hash';

import { hashFromPlusCodeAndTimestamp } from './hash-from-plus-code-and-timestamp';

describe('hashFromPosition', () => {
  const timestampGranularityInSeconds = 100;

  describe('with mocks', () => {
    let originalHash;

    beforeEach(() => {
      originalHash = hash;
      // @ts-ignore
      hash = jest.fn();
    });

    afterEach(() => {
      // @ts-ignore
      hash = originalHash;
    });

    it(`calls the hash lib with plusCode and timestamp rounded down to ${timestampGranularityInSeconds}s`, () => {
      const dummyPlusCode = 'dummyPlusCode';
      hashFromPlusCodeAndTimestamp({
        plusCode: dummyPlusCode,
        timestamp: 1586705953,
        timestampGranularityInSeconds
      });
      expect(hash).toHaveBeenCalledWith(`${dummyPlusCode}${1586700}`);
    });
  });

  describe('without mocks', () => {
    it('returns the right hash', () => {
      const dummyPlusCode = 'dummyPlusCode';

      expect(
        hashFromPlusCodeAndTimestamp({
          plusCode: dummyPlusCode,
          timestamp: 1586705953,
          timestampGranularityInSeconds
        })
      ).toEqual(
        'a82cdea6616a535b9d201e4efa8c0ab2e28fbaa9cca8820112453d3dfeec6fce'
      );
    });

    it(`returns the same hash for timestamps within ${timestampGranularityInSeconds}s`, () => {
      const dummyPlusCode = 'dummyPlusCode';

      const timestamp1 = 1586700000;
      const timestamp2 = 1586700000 + timestampGranularityInSeconds * 1000 - 1;
      expect(
        hashFromPlusCodeAndTimestamp({
          plusCode: dummyPlusCode,
          timestamp: timestamp1,
          timestampGranularityInSeconds
        })
      ).toEqual(
        hashFromPlusCodeAndTimestamp({
          plusCode: dummyPlusCode,
          timestamp: timestamp2,
          timestampGranularityInSeconds
        })
      );
    });

    it(`returns a different hash for timestamps longer than ${timestampGranularityInSeconds}s apart`, () => {
      const dummyPlusCode = 'dummyPlusCode';

      const timestamp1 = 1586700000;
      const timestamp2 = 1586700000 + timestampGranularityInSeconds * 1000;

      expect(
        hashFromPlusCodeAndTimestamp({
          plusCode: dummyPlusCode,
          timestamp: timestamp1,
          timestampGranularityInSeconds
        })
      ).not.toEqual(
        hashFromPlusCodeAndTimestamp({
          plusCode: dummyPlusCode,
          timestamp: timestamp2,
          timestampGranularityInSeconds
        })
      );
    });
  });
});
