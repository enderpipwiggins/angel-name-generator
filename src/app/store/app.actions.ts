import { createAction, props } from '@ngrx/store';
import { GeneratedAngel, Tradition, Domain, SuffixFilter } from '../angel-name-generator.service';

export const setTradition   = createAction('[Params] Set Tradition',    props<{ tradition: Tradition }>());
export const setDomain      = createAction('[Params] Set Domain',       props<{ domain: Domain }>());
export const setSuffixFilter = createAction('[Params] Set SuffixFilter', props<{ suffixFilter: SuffixFilter }>());
export const setCount       = createAction('[Params] Set Count',        props<{ count: number }>());

export const generateNames        = createAction('[Names] Generate');
export const generateNamesSuccess = createAction('[Names] Generate Success', props<{ results: GeneratedAngel[] }>());
