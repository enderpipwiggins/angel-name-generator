import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Tradition, Domain, SuffixFilter, GeneratedAngel } from './angel-name-generator.service';
import { AppState } from './store/app.state';
import { setTradition, setDomain, setSuffixFilter, setCount, generateNames } from './store/app.actions';
import { selectTradition, selectDomain, selectSuffixFilter, selectCount, selectResults } from './store/app.selectors';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  tradition$:    Observable<Tradition>        = this.store.select(selectTradition);
  domain$:       Observable<Domain>           = this.store.select(selectDomain);
  suffixFilter$: Observable<SuffixFilter>     = this.store.select(selectSuffixFilter);
  count$:        Observable<number>           = this.store.select(selectCount);
  results$:      Observable<GeneratedAngel[]> = this.store.select(selectResults);

  readonly traditions: Tradition[]    = ['hebrew', 'christian', 'islamic', 'enochian', 'all'];
  readonly domains:    Domain[]       = ['any', 'celestial', 'nature', 'divine', 'concepts', 'geography', 'time', 'hidden', 'war', 'healing'];
  readonly suffixes:   SuffixFilter[] = ['el', 'iel', 'on', 'il', 'ail', 'eel', 'none', 'any'];

  constructor(private store: Store<AppState>) {}

  onTraditionChange(event: Event)    { this.store.dispatch(setTradition({ tradition: (event.target as HTMLSelectElement).value as Tradition })); }
  onDomainChange(event: Event)       { this.store.dispatch(setDomain({ domain: (event.target as HTMLSelectElement).value as Domain })); }
  onSuffixFilterChange(event: Event) { this.store.dispatch(setSuffixFilter({ suffixFilter: (event.target as HTMLSelectElement).value as SuffixFilter })); }
  onCountChange(event: Event)        { this.store.dispatch(setCount({ count: +(event.target as HTMLInputElement).value })); }
  generate()                         { this.store.dispatch(generateNames()); }
}
