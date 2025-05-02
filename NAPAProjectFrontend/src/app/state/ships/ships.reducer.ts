import { createReducer, on } from '@ngrx/store';
import * as ShipActions from './ships.actions';
import { Ship } from '../../models/ship.model';

export interface ShipState {
  ships: Ship[];
  loading: boolean;
  error: string | null;
}

export const initialState: ShipState = {
  ships: [],
  loading: false,
  error: null,
};

export const shipReducer = createReducer(
  initialState,

  // load
  on(ShipActions.loadShips, state => ({ ...state, loading: true })),
  on(ShipActions.loadShipsSuccess, (state, { ships }) => ({ ...state, ships, loading: false })),
  on(ShipActions.loadShipsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // add
  on(ShipActions.addShipSuccess, (state, { ship }) => ({
    ...state,
    ships: [...state.ships, ship]
  })),

  // delete
  on(ShipActions.deleteShipSuccess, (state, { name }) => ({
    ...state,
    ships: state.ships.filter(s => s.name !== name)
  }))
);

export {};