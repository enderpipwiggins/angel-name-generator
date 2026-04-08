import { GeneratedAngel, Tradition, Domain, SuffixFilter } from '../angel-name-generator.service';

export interface AppState {
  tradition: Tradition;
  domain: Domain;
  suffixFilter: SuffixFilter;
  count: number;
  results: GeneratedAngel[];
}

export const initialState: AppState = {
  tradition: 'all',
  domain: 'any',
  suffixFilter: 'any',
  count: 10,
  results: [],
};
