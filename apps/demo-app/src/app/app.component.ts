import { Component } from '@angular/core';
import { CurrentHashService } from '../../../../libs/current-hash/src/lib/current-hash.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'epidemic-contact-tracing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public hash$: Observable<string>;
  constructor(private currentHash: CurrentHashService) {
    this.hash$ = currentHash.hash$;
  }
}
