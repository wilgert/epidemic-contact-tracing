import { location } from './location';

describe('location', () => {
  it('returns latitude and longtitude', () => {
    expect(location()).toEqual('location');
  });
});
