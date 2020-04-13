import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { StoreHashService } from './store-hash.service';

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
