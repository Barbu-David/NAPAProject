import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ShipActions from './ships.actions';
import { ShipService } from '../../services/ship.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Ship } from '../../models/ship.model';

@Injectable()
export class ShipEffects {
  constructor(private actions$: Actions, private shipService: ShipService) {}

  loadShips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipActions.loadShips),
      mergeMap(() =>
        this.shipService.getShips().pipe(
          mergeMap(names => {
            if (names.length === 0) {
              return of(ShipActions.loadShipsSuccess({ ships: [] }));
            }
            const calls = names.map(name =>
              this.shipService.getShipSpeed(name).pipe(
                map(speed => ({ name, speed } as Ship)),
                catchError(() => of({ name, speed: 0 } as Ship))
              )
            );
            return forkJoin(calls).pipe(
              map(ships => ShipActions.loadShipsSuccess({ ships }))
            );
          }),
          catchError(err => of(ShipActions.loadShipsFailure({ error: err.message })))
        )
      )
    )
  );

  addShip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipActions.addShip),
      mergeMap(({ ship }) =>
        this.shipService.addShip(ship).pipe(
          map(() => ShipActions.addShipSuccess({ ship })),
          catchError(err => of(ShipActions.addShipFailure({ error: err.message })))
        )
      )
    )
  );

  deleteShip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipActions.deleteShip),
      mergeMap(({ name }) =>
        this.shipService.deleteShip(name).pipe(
          map(() => ShipActions.deleteShipSuccess({ name })),
          catchError(err => of(ShipActions.deleteShipFailure({ error: err.message })))
        )
      )
    )
  );

    updateNameShip$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShipActions.updateNameShip),
        mergeMap(({ name, newName }) =>
          this.shipService.updateNameShip(name, newName).pipe(
            map(() => ShipActions.updateNameShipSuccess({ name, newName })),
            catchError(err => of(ShipActions.updateNameShipFailure({ error: err.message })))
          )
        )
      )
    );

    updateSpeedShip$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ShipActions.updateSpeedShip),
        mergeMap(({ name, newSpeed }) =>
          this.shipService.updateSpeedShip(name, newSpeed).pipe(
            map(() => ShipActions.updateSpeedShipSuccess({ name, newSpeed })),
            catchError(err => of(ShipActions.updateSpeedShipFailure({ error: err.message })))
          )
        )
      )
    );

}
