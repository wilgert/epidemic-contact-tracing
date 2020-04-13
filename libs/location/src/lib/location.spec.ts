import { locationWrapper } from './locationWrapper';
import { dummyPosition } from './mocks';

const mockGeolocation = {
  getCurrentPosition: jest.fn().mockResolvedValue(dummyPosition),
  watchPosition: jest.fn()
};

describe.skip('location', () => {
  const timestampGranularityInSeconds = 100;
  const maximumAgeInSeconds = timestampGranularityInSeconds / 2;
  const timeoutInSeconds = 30;

  beforeEach(() => {
    // @ts-ignore
    navigator.geolocation = mockGeolocation;
  });

  it('calls the geolocation API with the right PositionOptions', async () => {
    const positionOptions: PositionOptions = {
      maximumAge: maximumAgeInSeconds * 1000,
      timeout: timeoutInSeconds * 1000,
      enableHighAccuracy: true
    };
    await locationWrapper({ timestampGranularityInSeconds, timeoutInSeconds });
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      positionOptions
    );
  });

  it('returns a Position object', async () => {
    const result = await locationWrapper({
      timestampGranularityInSeconds,
      timeoutInSeconds
    });
    expect(result).toEqual(dummyPosition);
  });
});
