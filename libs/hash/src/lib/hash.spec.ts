import { hash } from './hash';

describe('hash', () => {
  it('returns a sha-2 256-bit hash using 50.000 iterations', () => {
    const actual = hash('solongandthanksforallthefish');
    expect(actual).toEqual('7afc4fca46dd49a68e3fed400415dde1d95ee3aa7c2d3e353147e01dd8804c52');
  });
});
