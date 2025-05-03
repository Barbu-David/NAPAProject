import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, mergeMap, exhaustMap, map } from 'rxjs/operators';
import * as VoyageActions from './voyages.actions';
import { VoyageService } from '../../services/voyage.service';
import { Voyage } from '../../models/voyage.model';


@Injectable()
export class VoyageEffects {
  constructor(
    private actions$: Actions,
    private voyageService: VoyageService
  ) {}


  loadVoyages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoyageActions.loadVoyages),
      exhaustMap(() =>
        this.voyageService.getVoyages().pipe(
          mergeMap((ids: number[]) => {
            const baseSuccess = VoyageActions.loadVoyagesSuccess({ ids });
            if (!ids.length) {
              return of(baseSuccess);
            }

            const detailCalls = ids.map(id =>
              forkJoin({
                date: this.voyageService.getDate(id),
                departurePort: this.voyageService.getDeparturePort(id),
                arrivalPort: this.voyageService.getArrivalPort(id),
                startTime: this.voyageService.getStartTime(id),
                endTime: this.voyageService.getEndTime(id)
              }).pipe(
                map(fields => ({
                  id,
                  date: fields.date,
                  departurePort: fields.departurePort,
                  arrivalPort: fields.arrivalPort,
                  startTime: fields.startTime,
                  endTime: fields.endTime
                } as Voyage))
              )
            );

            return forkJoin(detailCalls).pipe(
              mergeMap(voyages => [
                baseSuccess,
                ...voyages.map(v => VoyageActions.loadVoyageSuccess({ voyage: v }))
              ])
            );
          }),
          catchError(error =>
            of(VoyageActions.loadVoyagesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addVoyage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoyageActions.addVoyage),
      mergeMap(({ voyage }) =>
        this.voyageService.addVoyage(voyage).pipe(
          mergeMap((id: number) => [
            VoyageActions.addVoyageSuccess({ id }),
            VoyageActions.loadVoyages()       // refresh list
          ]),
          catchError(err =>
            of(VoyageActions.addVoyageFailure({ error: err.message }))
          )
        )
      )
    )
  );

  deleteVoyage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoyageActions.deleteVoyage),
      mergeMap(({ id }) =>
        this.voyageService.deleteVoyage(id).pipe(
          mergeMap(() => [
            VoyageActions.deleteVoyageSuccess({ id }),
            VoyageActions.loadVoyages()
          ]),
          catchError(err =>
            of(VoyageActions.deleteVoyageFailure({ error: err.message }))
          )
        )
      )
    )
  );

  updateArrivalPort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoyageActions.updateArrivalPort),
      mergeMap(({ id, port }) =>
        this.voyageService.updateArrivalPort(id, port).pipe(
          mergeMap(() => [
            VoyageActions.updateArrivalPortSuccess({ id, port }),
            VoyageActions.loadVoyages()
          ]),
          catchError(err =>
            of(VoyageActions.updateArrivalPortFailure({ error: err.message }))
          )
        )
      )
    )
  );

  updateDeparturePort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoyageActions.updateDeparturePort),
      mergeMap(({ id, port }) =>
        this.voyageService.updateDeparturePort(id, port).pipe(
          mergeMap(() => [
            VoyageActions.updateDeparturePortSuccess({ id, port }),
            VoyageActions.loadVoyages()
          ]),
          catchError(err =>
            of(VoyageActions.updateDeparturePortFailure({ error: err.message }))
          )
        )
      )
    )
  );

  updateDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoyageActions.updateDate),
      mergeMap(({ id, date }) =>
        this.voyageService.updateDate(id, date).pipe(
          mergeMap(() => [
            VoyageActions.updateDateSuccess({ id, date }),
            VoyageActions.loadVoyages()
          ]),
          catchError(err =>
            of(VoyageActions.updateDateFailure({ error: err.message }))
          )
        )
      )
    )
  );

  updateStartTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoyageActions.updateStartTime),
      mergeMap(({ id, startTime }) =>
        this.voyageService.updateStartTime(id, startTime).pipe(
          mergeMap(() => [
            VoyageActions.updateStartTimeSuccess({ id, startTime }),
            VoyageActions.loadVoyages()
          ]),
          catchError(err =>
            of(VoyageActions.updateStartTimeFailure({ error: err.message }))
          )
        )
      )
    )
  );

  updateEndTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VoyageActions.updateEndTime),
      mergeMap(({ id, endTime }) =>
        this.voyageService.updateEndTime(id, endTime).pipe(
          mergeMap(() => [
            VoyageActions.updateEndTimeSuccess({ id, endTime }),
            VoyageActions.loadVoyages()
          ]),
          catchError(err =>
            of(VoyageActions.updateEndTimeFailure())
          )
        )
      )
    )
  );
}

export {};
