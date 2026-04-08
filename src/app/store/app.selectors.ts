import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectApp = createFeatureSelector<AppState>('app');

export const selectTradition    = createSelector(selectApp, s => s.tradition);
export const selectDomain       = createSelector(selectApp, s => s.domain);
export const selectSuffixFilter = createSelector(selectApp, s => s.suffixFilter);
export const selectCount        = createSelector(selectApp, s => s.count);
export const selectResults      = createSelector(selectApp, s => s.results);
