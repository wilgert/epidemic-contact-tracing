import { Injectable } from '@angular/core';
import {
  hashFromPosition
} from '@epidemic-contact-tracing/hash-from-position';
import { locationWrapper } from '@epidemic-contact-tracing/location';
import { from, NEVER, Observable, timer } from 'rxjs';
import { catchError, map, share, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CurrentHashService {
  public hash$: Observable<string>;
  private readonly timestampGranularityInSeconds = 100;

  constructor() {
    this.hash$ = timer(0, this.timestampGranularityInSeconds * 1000).pipe(
      switchMap(() =>
        from(
          locationWrapper({
            timestampGranularityInSeconds: this.timestampGranularityInSeconds,
            timeoutInSeconds: 30
          })
        )
      ),
      map((position: Position) => hashFromPosition(position, this.timestampGranularityInSeconds)),
      catchError(err => {
        console.table(err);
        return NEVER;
      }),
      share()
    );
  }
}
