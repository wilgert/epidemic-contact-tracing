export interface LocationWrapperConfig {
  timestampGranularityInSeconds: number;
  timeoutInSeconds: number;
}

export function locationWrapper({
  timestampGranularityInSeconds,
  timeoutInSeconds
}: LocationWrapperConfig): Promise<Position> {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      maximumAge: (timestampGranularityInSeconds / 10) * 1000,
      timeout: timeoutInSeconds * 1000,
      enableHighAccuracy: true
    });
  });
}
