export function location(): Promise<Position> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      maximumAge: 50 * 1000,
      timeout: 30 * 1000,
      enableHighAccuracy: true
    });
  });
}
