import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, map } from 'rxjs/operators';
import { generateNames, generateNamesSuccess, generateNamesFailure } from './app.actions';
import { selectTradition, selectDomain, selectSuffixFilter, selectCount } from './app.selectors';
import { AngelNameGeneratorService } from '../angel-name-generator.service';
import { AppState } from './app.state';

@Injectable()
export class AppEffects {

  generate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generateNames),
      withLatestFrom(
        this.store.select(selectTradition),
        this.store.select(selectDomain),
        this.store.select(selectSuffixFilter),
        this.store.select(selectCount),
      ),
      // map is correct here because generate() is synchronous — no inner observable is created.
      // If generation moves to an async API call, replace map with switchMap (or exhaustMap
      // to ignore duplicate clicks while a request is in flight).
      map(([, tradition, domain, suffixFilter, count]) => {
        try {
          const results = this.svc.generate({ tradition, domain, suffixFilter, count });
          return generateNamesSuccess({ results });
        } catch (error) {
          return generateNamesFailure({ error });
        }
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private svc: AngelNameGeneratorService,
  ) {}
}
