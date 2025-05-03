import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PortActions from './ports.actions';
import { PortService } from '../../services/port.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Port } from '../../models/port.model';

@Injectable()
export class PortEffects {
  constructor(private actions$: Actions, private portService: PortService) {}

  loadPorts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortActions.loadPorts),
      mergeMap(() =>
        this.portService.getPorts().pipe(
          mergeMap(names => {
            if (names.length === 0) {
              return of(PortActions.loadPortsSuccess({ ports: [] }));
            }
            const calls = names.map(name =>
              this.portService.getPortCountry(name).pipe(
                map(country => ({ name, country } as Port)),
                catchError(() => of({ name, country: '' } as Port))
              )
            );
            return forkJoin(calls).pipe(
              map(ports => PortActions.loadPortsSuccess({ ports }))
            );
          }),
          catchError(err => of(PortActions.loadPortsFailure({ error: err.message })))
        )
      )
    )
  );

  addPort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortActions.addPort),
      mergeMap(({ port }) =>
        this.portService.addPort(port).pipe(
          map(() => PortActions.loadPorts()),
          catchError(err => of(PortActions.addPortFailure({ error: err.message })))
        )
      )
    )
  );
  
  deletePort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortActions.deletePort),
      mergeMap(({ name }) =>
        this.portService.deletePort(name).pipe(
          map(() => PortActions.deletePortSuccess({ name })),
          catchError(err => of(PortActions.deletePortFailure({ error: err.message })))
        )
      )
    )
  );

  updateNamePort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortActions.updateNamePort),
      mergeMap(({ name, newName }) =>
        this.portService.updateNamePort(name, newName).pipe(
          map(() => PortActions.updateNamePortSuccess({ name, newName })),
          catchError(err => of(PortActions.updateNamePortFailure({ error: err.message })))
        )
      )
    )
  );

  updateCountryPort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortActions.updateCountryPort),
      mergeMap(({ name, newCountry }) =>
        this.portService.updateCountryPort(name, newCountry).pipe(
          map(() => PortActions.updateCountryPortSuccess({ name, newCountry })),
          catchError(err => of(PortActions.updateCountryPortFailure({ error: err.message })))
        )
      )
    )
  );
}

export {};
