import { createAction, props } from '@ngrx/store';
import { Ship } from '../../models/ship.model';
import { ErrorMessage } from '../../models/error-message.model';

// load
export const loadShips        = createAction('[Ships] Load Ships');
export const loadShipsSuccess = createAction('[Ships] Load Ships Success', props<{ ships: Ship[] }>());
export const loadShipsFailure = createAction('[Ships] Load Ships Failure', props<{ error: ErrorMessage }>());

// add
export const addShip        = createAction('[Ships] Add Ship', props<{ ship: Ship }>());
export const addShipSuccess = createAction('[Ships] Add Ship Success', props<{ ship: Ship }>());
export const addShipFailure = createAction('[Ships] Add Ship Failure', props<{ error: ErrorMessage }>());

// delete
export const deleteShip        = createAction('[Ships] Delete Ship', props<{ name: string }>());
export const deleteShipSuccess = createAction('[Ships] Delete Ship Success', props<{ name: string }>());
export const deleteShipFailure = createAction('[Ships] Delete Ship Failure', props<{ error: ErrorMessage }>());

export{}