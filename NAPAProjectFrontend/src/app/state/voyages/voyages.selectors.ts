import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VoyageState } from './voyages.reducer';

export const selectVoyageState = createFeatureSelector<VoyageState>('voyages');
export const selectVoyageList = createSelector(selectVoyageState, state => state.voyages);
export const selectVoyageLoading = createSelector(selectVoyageState, state => state.loading);
export const selectVoyageError = createSelector(selectVoyageState, state => state.error);
