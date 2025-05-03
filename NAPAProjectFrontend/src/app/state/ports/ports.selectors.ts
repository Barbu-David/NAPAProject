import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortState } from './ports.reducer';

export const selectPortState = createFeatureSelector<PortState>('ports');
export const selectPortList = createSelector(selectPortState, state => state.ports);
export const selectPortLoading = createSelector(selectPortState, state => state.loading);
export const selectPortError = createSelector(selectPortState, state => state.error);
