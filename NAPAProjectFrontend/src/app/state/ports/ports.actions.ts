import { createAction, props } from '@ngrx/store';
import { Port } from '../../models/port.model';
import { ErrorMessage } from '../../models/error-message.model';

export const loadPorts = createAction('[Ports] Load Ports');
export const loadPortsSuccess = createAction('[Ports] Load Ports Success', props<{ ports: Port[] }>());
export const loadPortsFailure = createAction('[Ports] Load Ports Failure', props<{ error: ErrorMessage }>());

export const addPort = createAction('[Ports] Add Port', props<{ port: Port }>());
export const addPortSuccess = createAction('[Ports] Add Port Success', props<{ port: Port }>());
export const addPortFailure = createAction('[Ports] Add Port Failure', props<{ error: ErrorMessage }>());

export const deletePort = createAction('[Ports] Delete Port', props<{ name: string }>());
export const deletePortSuccess = createAction('[Ports] Delete Port Success', props<{ name: string }>());
export const deletePortFailure = createAction('[Ports] Delete Port Failure', props<{ error: ErrorMessage }>());

export const updateNamePort = createAction('[Ports] Rename Port', props<{ name: string; newName: string }>());
export const updateNamePortSuccess = createAction('[Ports] Rename Port Success', props<{ name: string; newName: string }>());
export const updateNamePortFailure = createAction('[Ports] Rename Port Failure', props<{ error: ErrorMessage }>());

export const updateCountryPort = createAction('[Ports] Update Country Port', props<{ name: string; newCountry: string }>());
export const updateCountryPortSuccess = createAction('[Ports] Update Country Port Success', props<{ name: string; newCountry: string }>());
export const updateCountryPortFailure = createAction('[Ports] Update Country Port Failure', props<{ error: ErrorMessage }>());

export {};