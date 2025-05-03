import { createReducer, on } from '@ngrx/store';
import * as CountryActions from './countries.actions';
import { Country } from '../../models/country.model';

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

export const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const countryReducer = createReducer(
  initialState,

  // load
  on(CountryActions.loadCountries, state => ({ ...state, loading: true })),
  on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({ ...state, countries, loading: false })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // add
  on(CountryActions.addCountrySuccess, (state, { countries }) => ({...state, countries: [...state.countries, countries]})),

  // delete
  on(CountryActions.deleteCountrySuccess, (state, { name }) => ({...state, s: state.countries.filter(s => s.name !== name)})),

  // updateName
  on(CountryActions.updateNameCountrySuccess, (state, { name, newName }) => ({
    ...state,
    countries: state.countries.map(s =>
      s.name === name
        ? { ...s, name: newName }
        : s
    )
  })),
);

export {};