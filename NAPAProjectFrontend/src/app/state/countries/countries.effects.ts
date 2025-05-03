import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountryActions from './countries.actions';
import { CountryService } from '../../services/country.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Country } from '../../models/country.model';

@Injectable()
export class CountryEffects {
  constructor(private actions$: Actions, private countryService: CountryService) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.countryService.getCountries().pipe(
          mergeMap(names => {
            if (names.length === 0) {
              return of(CountryActions.loadCountriesSuccess({ countries: [] }));
            }
            const calls = names.map(name =>
              this.countryService.getCountryVisited(name).pipe(
                map(visited => ({ name, visited } as Country)),
                catchError(() => of({ name, visited: false } as Country))
              )
            );
            return forkJoin(calls).pipe(
              map(countries => CountryActions.loadCountriesSuccess({ countries }))
            );
          }),
          catchError(err => of(CountryActions.loadCountriesFailure({ error: err.message })))
        )
      )
    )
  );

  addCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.addCountry),
      mergeMap(({ countries }) =>
        this.countryService.addCountry(countries).pipe(
          map(() => CountryActions.addCountrySuccess({ countries })),
          catchError(err => of(CountryActions.addShipFailure({ error: err.message })))
        )
      )
    )
  );

  deleteCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.deleteCountry),
      mergeMap(({ name }) =>
        this.countryService.deleteCountry(name).pipe(
          map(() => CountryActions.deleteCountrySuccess({ name })),
          catchError(err => of(CountryActions.deleteCountryFailure({ error: err.message })))
        )
      )
    )
  );

    updateNameCountry$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CountryActions.updateNameCountry),
        mergeMap(({ name, newName }) =>
          this.countryService.updateNameCountry(name, newName).pipe(
            map(() => CountryActions.updateNameCountrySuccess({ name, newName })),
            catchError(err => of(CountryActions.updateNameCountryFailure({ error: err.message })))
          )
        )
      )
    );
}
