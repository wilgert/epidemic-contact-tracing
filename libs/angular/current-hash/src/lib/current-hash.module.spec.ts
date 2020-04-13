import { async, TestBed } from '@angular/core/testing';
import { CurrentHashModule } from './current-hash.module';
import 'zone.js/dist/zone-testing';

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
