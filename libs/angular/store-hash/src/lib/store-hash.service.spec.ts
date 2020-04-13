import { TestBed } from '@angular/core/testing';

import { StoreHashService } from './store-hash.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('StoreHashService', () => {
  let service: StoreHashService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NgxIndexedDBService, useValue: {} }]
    });
    service = TestBed.inject(StoreHashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
