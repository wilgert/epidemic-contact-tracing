import { async, TestBed } from '@angular/core/testing';

import { StoreHashModule } from './store-hash.module';

describe('StoreHashModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreHashModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreHashModule).toBeDefined();
  });
});
