import { createReducer, on } from '@ngrx/store';
import * as VoyageActions from './voyages.actions';
import { Voyage } from '../../models/voyage.model';

export interface VoyageState {
  voyages: Voyage[];
  loading: boolean;
  error: string | null;
}

export const initialState: VoyageState = {
  voyages: [],
  loading: false,
  error: null,
};

export const voyageReducer = createReducer(
  initialState,

  on(VoyageActions.loadVoyages, state => ({ ...state, loading: true })),
  on(VoyageActions.loadVoyagesSuccess, (state, { ids }) => ({
    ...state,
    voyages: ids.map(id => ({ id } as Voyage)),
    loading: false
  })),
  on(VoyageActions.loadVoyagesFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(VoyageActions.loadVoyageSuccess, (state, { voyage }) => ({
    ...state,
    voyages: [...state.voyages.filter(v => v.id !== voyage.id), voyage]
  })),
  on(VoyageActions.loadVoyageFailure, (state, { error }) => ({ ...state, error })),

  on(VoyageActions.addVoyageSuccess, (state, { id }) => ({
    ...state,
    voyages: [...state.voyages, { id } as Voyage]
  })),
  on(VoyageActions.addVoyageFailure, (state, { error }) => ({ ...state, error })),

  on(VoyageActions.deleteVoyageSuccess, (state, { id }) => ({
    ...state,
    voyages: state.voyages.filter(v => v.id !== id)
  })),
  on(VoyageActions.deleteVoyageFailure, (state, { error }) => ({ ...state, error })),

  on(VoyageActions.updateArrivalPortSuccess, (state, { id, port }) => ({
    ...state,
    voyages: state.voyages.map(v => v.id === id ? { ...v, arrivalPort: port } : v)
  })),
  on(VoyageActions.updateArrivalPortFailure, (state, { error }) => ({ ...state, error })),

  on(VoyageActions.updateDeparturePortSuccess, (state, { id, port }) => ({
    ...state,
    voyages: state.voyages.map(v => v.id === id ? { ...v, departurePort: port } : v)
  })),
  on(VoyageActions.updateDeparturePortFailure, (state, { error }) => ({ ...state, error })),

  on(VoyageActions.updateDateSuccess, (state, { id, date }) => ({
    ...state,
    voyages: state.voyages.map(v => v.id === id ? { ...v, date } : v)
  })),
  on(VoyageActions.updateDateFailure, (state, { error }) => ({ ...state, error })),

  on(VoyageActions.updateStartTimeSuccess, (state, { id, startTime }) => ({
    ...state,
    voyages: state.voyages.map(v => v.id === id ? { ...v, startTime } : v)
  })),
  on(VoyageActions.updateStartTimeFailure, (state, { error }) => ({ ...state, error })),

  on(VoyageActions.updateEndTimeSuccess, (state, { id, endTime }) => ({
    ...state,
    voyages: state.voyages.map(v => v.id === id ? { ...v, endTime } : v)
  })),
  on(VoyageActions.updateEndTimeFailure, (state, {}) => ({ ...state})), //TO DO : ADD ERROR
);

export {};
