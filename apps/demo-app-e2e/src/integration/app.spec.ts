import { getHash } from '../support/app.po';

describe('demo-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display hash', () => {
    // Function helper example, see `../support/app.po.ts` file
    getHash().contains(/[A-Fa-f0-9]{64}/);
  });
});
