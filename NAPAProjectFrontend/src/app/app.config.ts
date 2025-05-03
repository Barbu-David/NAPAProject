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
import { portReducer } from './state/ports/ports.reducer';
import { PortEffects } from './state/ports/ports.effects';
import { voyageReducer } from './state/voyages/voyages.reducer';
import { VoyageEffects } from './state/voyages/voyages.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), 
    provideStore({ ships: shipReducer , countries: countryReducer, ports: portReducer, voyages: voyageReducer}),
    provideEffects([ShipEffects, CountryEffects, PortEffects, VoyageEffects]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
