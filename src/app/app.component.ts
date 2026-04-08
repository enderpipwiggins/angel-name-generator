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

  setTradition(tradition: Tradition)       { this.store.dispatch(setTradition({ tradition })); }
  setDomain(domain: Domain)                { this.store.dispatch(setDomain({ domain })); }
  setSuffixFilter(suffixFilter: SuffixFilter) { this.store.dispatch(setSuffixFilter({ suffixFilter })); }
  setCount(count: number)                  { this.store.dispatch(setCount({ count })); }
  generate()                               { this.store.dispatch(generateNames()); }
}
