import { TestBed } from '@angular/core/testing';

import { StoreHashService } from './store-hash.service';

describe('StoreHashService', () => {
  let service: StoreHashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreHashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
