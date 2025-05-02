import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShipState } from './ships.reducer';

export const selectShipState   = createFeatureSelector<ShipState>('ships');
export const selectShipList    = createSelector(selectShipState, s => s.ships);
export const selectShipLoading = createSelector(selectShipState, s => s.loading);
export const selectShipError   = createSelector(selectShipState, s => s.error);

export {};