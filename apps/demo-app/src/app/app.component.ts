import { Component } from '@angular/core';
import { CurrentHashService } from '@epidemic-contact-tracing/current-hash';
import { StoreHashService } from '@epidemic-contact-tracing/store-hash';
import { Observable, Subject } from 'rxjs';
import { share, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'epidemic-contact-tracing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public timing: string;
  public hash$: Observable<string>;
  public totalHashes$: Observable<number>;
  private checkHashesSubject = new Subject<string[]>();
  public matchingHashes$ = this.checkHashesSubject.asObservable().pipe(
    tap(() => performance.mark('checkHashesStart')),
    switchMap(hashes => this.storeHashService.checkHashes(hashes)),
    tap(() => {
      performance.measure('Time taken checking hashes', 'checkHashesStart');
      console.table(performance.getEntriesByName('Time taken checking hashes'));
      performance.clearMarks();
      performance.clearMeasures();
    }),
    startWith([]),
    share()
  );

  constructor(
    private currentHash: CurrentHashService,
    private storeHashService: StoreHashService
  ) {
    this.hash$ = currentHash.hash$;
    this.totalHashes$ = storeHashService.totalHashes$;
  }

  checkHashes(hashes: string[]) {
    this.checkHashesSubject.next(hashes);
  }
}
