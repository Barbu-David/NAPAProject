import { createAction, props } from '@ngrx/store';
import { Country } from '../../models/country.model';
import { ErrorMessage } from '../../models/error-message.model';

// load
export const loadCountries        = createAction('[Countries] Load Countries');
export const loadCountriesSuccess = createAction('[Countries] Load Countries Success', props<{ countries: Country[] }>());
export const loadCountriesFailure = createAction('[Countries] Load Countries Failure', props<{ error: ErrorMessage }>());

// add
export const addCountry     = createAction('[Countries] Add Country', props<{ countries: Country }>());
export const addCountrySuccess = createAction('[Countries] Add Country Success', props<{ countries: Country }>());
export const addShipFailure = createAction('[Countries] Add Country Failure', props<{ error: ErrorMessage }>());

// delete
export const deleteCountry        = createAction('[Countries] Delete Country', props<{ name: string }>());
export const deleteCountrySuccess = createAction('[Countries] Delete Country Success', props<{ name: string }>());
export const deleteCountryFailure = createAction('[Countries] Delete Country Failure', props<{ error: ErrorMessage }>());

// update name
export const updateNameCountry = createAction('[Countries] Rename Country',props<{ name: string; newName: string }>());
export const updateNameCountrySuccess = createAction('[Countries] Rename Country Success', props<{ name: string; newName: string }>());
export const updateNameCountryFailure = createAction('[Countries] Rename Country Failure', props<{ error: ErrorMessage }>());

export{}