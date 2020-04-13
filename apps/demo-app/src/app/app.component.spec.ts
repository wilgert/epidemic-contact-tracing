import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentHashService } from '@epidemic-contact-tracing/current-hash';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { StoreHashService } from '@epidemic-contact-tracing/store-hash';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: CurrentHashService,
          useValue: {
            hash$: of('dummyHash')
          }
        },
        {
          provide: StoreHashService,
          useValue: {
            totalHashes$: of(42),
            checkHashes: () => of([])
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it.skip(`should show the current Hash from CurrentHashService`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toContain('dummyHash');
  });

  it.skip(`should show the total Hashes from StoreHashService`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h2'));
    expect(h1.nativeElement.innerText).toContain('Total hashes: 42');
  });
});
