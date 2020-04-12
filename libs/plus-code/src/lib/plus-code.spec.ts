import { plusCode } from './plus-code';
import OpenLocationCode from 'open-location-code-typescript';

describe('plusCode', () => {
  beforeEach(() => {
    spyOn(OpenLocationCode, 'encode');
  });

  it('should call encode on OpenLocationCode', () => {
    plusCode(1337, 42);

    expect(OpenLocationCode.encode).toHaveBeenCalledWith(1337, 42);
  });

  it('returns the plusCode received from OpenLocationCode', () => {
    (OpenLocationCode.encode as jasmine.Spy).and.returnValue('dummyPlusCode');

    expect(plusCode(1337, 42)).toEqual('dummyPlusCode');
  });

  it('should get a valid plus code for Dam, Amsterdam', () => {
    (OpenLocationCode.encode as jasmine.Spy).and.callThrough();

    expect(plusCode(52.373062,4.892687)).toEqual('9F469VFV+63');
  });
});
