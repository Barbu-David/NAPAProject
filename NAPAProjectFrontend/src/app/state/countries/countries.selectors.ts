import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './countries.reducer';

export const selectCountryState   = createFeatureSelector<CountryState>('countries');
export const selectCountriesList = createSelector(selectCountryState, s => s.countries);
export const selectCountryLoading = createSelector(selectCountryState, s => s.loading);
export const selectCountryError   = createSelector(selectCountryState, s => s.error);

export {};