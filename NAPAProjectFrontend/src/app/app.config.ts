import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { shipReducer } from './state/ships/ships.reducer';
import { ShipEffects } from './state/ships/ships.effects';
import { countryReducer } from './state/countries/countries.reducer';
import { CountryEffects } from './state/countries/countries.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // ✅ needed for HttpClient to work
    provideStore({ ships: shipReducer , countries: countryReducer}),
    provideEffects([ShipEffects, CountryEffects]), // ✅ THE correct way to register effects
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
