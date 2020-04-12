import { locationWrapper } from './locationWrapper';
import { dummyPosition } from './mocks';

const mockGeolocation = {
  getCurrentPosition: jest.fn().mockResolvedValue(dummyPosition),
  watchPosition: jest.fn()
};

describe.skip('location', () => {
  beforeEach(() => {
    // @ts-ignore
    navigator.geolocation = mockGeolocation;
  });

  it('calls the geolocation API with the right PositionOptions', async () => {
    let positionOptions: PositionOptions = {
      maximumAge: 50 * 1000,
      timeout: 30 * 1000,
      enableHighAccuracy: true
    };

    await locationWrapper();
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), positionOptions)
  });

  it('returns a Position object', async () => {
    const result = await locationWrapper();
    expect(result).toEqual(dummyPosition);
  });
});
