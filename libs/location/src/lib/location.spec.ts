import { location } from './location';
import MockedFunction = jest.MockedFunction;

const mockGeolocation = {
  getCurrentPosition: jest.fn((success): Position => success({position: {latitude:52.373062,longitude:4.892687}, timestamp:13371891 })),
  watchPosition: jest.fn()
};

// @ts-ignore
navigator.geolocation = mockGeolocation;

describe('location', () => {
  it('calls the geolocation API with the right PositionOptions', async () => {
    let positionOptions: PositionOptions = {
      maximumAge: 50 * 1000,
      timeout: 30 * 1000,
      enableHighAccuracy: true
    };

    await location();
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), positionOptions)
  });

  it('returns a Position object', async () => {
    const result = await location();
    expect(result).toEqual({position: {latitude:52.373062,longitude:4.892687}, timestamp: 13371891});
  });
});
