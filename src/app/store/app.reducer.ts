import { createReducer, on } from '@ngrx/store';
import { initialState } from './app.state';
import { setTradition, setDomain, setSuffixFilter, setCount, generateNamesSuccess } from './app.actions';

export const appReducer = createReducer(
  initialState,
  on(setTradition,       (state, { tradition })    => ({ ...state, tradition })),
  on(setDomain,          (state, { domain })        => ({ ...state, domain })),
  on(setSuffixFilter,    (state, { suffixFilter })  => ({ ...state, suffixFilter })),
  on(setCount,           (state, { count })          => ({ ...state, count })),
  on(generateNamesSuccess, (state, { results })     => ({ ...state, results })),
);
