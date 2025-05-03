import { createReducer, on } from '@ngrx/store';
import * as PortActions from './ports.actions';
import { Port } from '../../models/port.model';

export interface PortState {
  ports: Port[];
  loading: boolean;
  error: string | null;
}

export const initialState: PortState = {
  ports: [],
  loading: false,
  error: null,
};

export const portReducer = createReducer(
  initialState,

  on(PortActions.loadPorts, state => ({ ...state, loading: true })),
  on(PortActions.loadPortsSuccess, (state, { ports }) => ({ ...state, ports, loading: false })),
  on(PortActions.loadPortsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(PortActions.addPortSuccess, (state, { port }) => ({ ...state, ports: [...state.ports, port] })),

  on(PortActions.deletePortSuccess, (state, { name }) => ({ ...state, ports: state.ports.filter(p => p.name !== name) })),

  on(PortActions.updateNamePortSuccess, (state, { name, newName }) => ({
    ...state,
    ports: state.ports.map(p =>
      p.name === name
        ? { ...p, name: newName }
        : p
    )
  })),

  on(PortActions.updateCountryPortSuccess, (state, { name, newCountry }) => ({
    ...state,
    ports: state.ports.map(p =>
      p.name === name
        ? { ...p, countryName: newCountry }
        : p
    )
  })),

  on(PortActions.updateNamePortFailure, (state, { error }) => ({ ...state, error })),
  on(PortActions.updateCountryPortFailure, (state, { error }) => ({ ...state, error })),
);

export {};
