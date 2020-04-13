import { Injectable } from '@angular/core';
import { hashFromPlusCodeAndTimestamp } from '@epidemic-contact-tracing/hash-from-position';
import { locationWrapper } from '@epidemic-contact-tracing/location';
import { from, NEVER, Observable, timer } from 'rxjs';
import { catchError, distinctUntilChanged, map, share, switchMap } from 'rxjs/operators';
import { plusCode } from '@epidemic-contact-tracing/plus-code';

@Injectable({
  providedIn: 'root'
})
export class CurrentHashService {
  public hashInput$: Observable<{ plusCode: string; timestamp: number }>;
  public hash$: Observable<string>;
  private readonly timestampGranularityInSeconds = 100;

  constructor() {
    this.hashInput$ = timer(0, (this.timestampGranularityInSeconds / 2 * 1000)).pipe(
      switchMap(() =>
        from(
          locationWrapper({
            timestampGranularityInSeconds: this.timestampGranularityInSeconds,
            timeoutInSeconds: 30
          })
        )
      ),
      map(({ coords: { latitude, longitude }, timestamp }: Position) => ({
        plusCode: plusCode(latitude, longitude),
        timestamp
      })),
      catchError(err => {
        console.table(err);
        return NEVER;
      }),
      share()
    );

    this.hash$ = this.hashInput$.pipe(
      map(({ plusCode, timestamp }) =>
        hashFromPlusCodeAndTimestamp({
          plusCode,
          timestamp,
          timestampGranularityInSeconds: this.timestampGranularityInSeconds
        })
      ),
      catchError(err => {
        console.table(err);
        return NEVER;
      }),
      distinctUntilChanged((x, y) => x === y),
      share()
    );
  }
}
