export function locationWrapper(): Promise<Position> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      maximumAge: 10 * 1000,
      timeout: 30 * 1000,
      enableHighAccuracy: true
    });
  });
}
