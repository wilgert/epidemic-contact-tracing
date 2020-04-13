import { async, TestBed } from '@angular/core/testing';
import 'zone.js/dist/zone-testing';

import { CurrentHashModule } from './current-hash.module';

describe('CurrentHashModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CurrentHashModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CurrentHashModule).toBeDefined();
  });
});
