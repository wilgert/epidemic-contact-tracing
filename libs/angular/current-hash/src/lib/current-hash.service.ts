import { Injectable } from '@angular/core';
import { from, NEVER, Observable, timer } from 'rxjs';
import { catchError, map, share, switchMap } from 'rxjs/operators';
import { locationWrapper } from '@epidemic-contact-tracing/location';
import { hashFromPosition, timestampGranularityInSeconds } from '@epidemic-contact-tracing/hash-from-position';

@Injectable({
  providedIn: 'root'
})
export class CurrentHashService {
  public hash$: Observable<string>;

  constructor() {
    this.hash$ = timer(0, (timestampGranularityInSeconds / 2) * 1000).pipe(
      switchMap(() => from(locationWrapper({timestampGranularityInSeconds, timeoutInSeconds: 30}))),
      map((position: Position) => hashFromPosition(position)),
      catchError((err) => {
        console.table(err);
        return NEVER;
      }),
      share()
    );
  }
}
