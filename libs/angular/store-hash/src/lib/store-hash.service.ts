import { Injectable, OnDestroy } from '@angular/core';
import { CurrentHashService } from '@epidemic-contact-tracing/current-hash';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { forkJoin, from, Observable, ReplaySubject, Subscription } from 'rxjs';
import { concatMap, distinctUntilChanged, map } from 'rxjs/operators';

import { OWN_HASHES_STORE_NAME } from './constants';

@Injectable({
  providedIn: 'root'
})
export class StoreHashService implements OnDestroy {
  private readonly subscription = new Subscription();

  private readonly totalHashesSubject = new ReplaySubject<number>(1);
  public totalHashes$ = this.totalHashesSubject.asObservable();

  constructor(
    private currentHashService: CurrentHashService,
    private indexedDB: NgxIndexedDBService
  ) {
    this.subscription.add(
      currentHashService.hash$
        .pipe(
          distinctUntilChanged((x, y) => x === y),
          concatMap(hash =>
            from(this.indexedDB.add(OWN_HASHES_STORE_NAME, { hash }))
          ),
          concatMap(() => from(this.indexedDB.count(OWN_HASHES_STORE_NAME)))
        )
        .subscribe(this.totalHashesSubject)
    );
  }

  checkHashes(hashes: string[]): Observable<string[]> {
    const uniqueHashes = [...new Set(hashes)];

    return forkJoin(
      uniqueHashes.map(hash =>
        from<Promise<number>>(
          this.indexedDB.count(OWN_HASHES_STORE_NAME, hash)
        ).pipe(map(count => ({ hash, count })))
      )
    ).pipe(
      map(results =>
        results.filter(({ count }) => count > 0).map(({ hash }) => hash)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
