import { Injectable } from '@angular/core';
import { from, NEVER, Observable, of, timer } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { locationWrapper } from '@epidemic-contact-tracing/location';
import { hashFromPosition } from '../../../hash-from-position/src';
import { storeHash } from '@epidemic-contact-tracing/store-hash';

@Injectable({
  providedIn: 'root'
})
export class CurrentHashService {
  public hash$: Observable<string>;

  constructor() {
    this.hash$ = timer(0, 5 * 1000).pipe(
      switchMap(() => from(locationWrapper())),
      map((position: Position) => hashFromPosition(position)),
      tap(hash => storeHash(hash)),
      catchError((err) => {
        console.table(err);
        return NEVER;
      }),
      share()
    );
  }
}
