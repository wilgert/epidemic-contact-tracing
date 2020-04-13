import { TestBed } from '@angular/core/testing';

import { CurrentHashService } from './current-hash.service';
describe('CurrentHashService', () => {
  let service: CurrentHashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentHashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
