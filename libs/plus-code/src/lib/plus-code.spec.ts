import OpenLocationCode from 'open-location-code-typescript';

import { getPlusCode } from './get-plus-code';

describe('plusCode', () => {
  beforeEach(() => {
    spyOn(OpenLocationCode, 'encode');
  });

  it('should call encode on OpenLocationCode', () => {
    getPlusCode(1337, 42);

    expect(OpenLocationCode.encode).toHaveBeenCalledWith(1337, 42);
  });

  it('returns the getPlusCode received from OpenLocationCode', () => {
    (OpenLocationCode.encode as jasmine.Spy).and.returnValue('dummyPlusCode');

    expect(getPlusCode(1337, 42)).toEqual('dummyPlusCode');
  });

  it('should get a valid plus code for Dam, Amsterdam', () => {
    (OpenLocationCode.encode as jasmine.Spy).and.callThrough();

    expect(getPlusCode(52.373062, 4.892687)).toEqual('9F469VFV+63');
  });
});
