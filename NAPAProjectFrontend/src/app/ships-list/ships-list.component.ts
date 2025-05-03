import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, interval, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';


import * as ShipActions from '../state/ships/ships.actions';
import {
  selectShipList,
  selectShipLoading,
  selectShipError
} from '../state/ships/ships.selectors';
import { Ship } from '../models/ship.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  standalone:  true,
  styleUrls: ['./ships-list.component.css'] ,
  imports:     [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ShipsListComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  ships$!:       Observable<Ship[]>;
  loading$!:     Observable<boolean>;
  error$!:       Observable<string | null>;

  renameInputs: { [shipName: string]: string } = {};
  speedInputs:  { [shipName: string]: number } = {};
  sortedShips$!: Observable<{ name: string; speed: number; }[]>;
  maxSpeed$!: Observable<number>;

  private refreshSub!: Subscription;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name:  ['', Validators.required],
      speed: [0, [Validators.required, Validators.min(1)]]
    });

    this.ships$   = this.store.select(selectShipList);
    this.loading$ = this.store.select(selectShipLoading);
    this.error$   = this.store.select(selectShipError);

    this.store.dispatch(ShipActions.loadShips());
    this.refreshSub = interval(1000)
      .subscribe(() => this.store.dispatch(ShipActions.loadShips()));

     // sort descending, take top 5
     this.sortedShips$ = this.ships$.pipe(
      map((list: Ship[]) => [...list]
        .sort((a, b) => b.speed - a.speed)
        .slice(0, 5)
      )
    );

    // compute max from the (up to) 5
    this.maxSpeed$ = this.sortedShips$.pipe(
      map((sorted: { name: string; speed: number; }[]) => sorted.length ? sorted[0].speed : 1)
    );

  }

  add() {
    if (this.form.valid) {
      const ship: Ship = this.form.value;
      this.store.dispatch(ShipActions.addShip({ ship }));
      this.form.reset({ name: '', speed: 0 });
    }
  }

  delete(name: string) {
    this.store.dispatch(ShipActions.deleteShip({ name }));
  }

  rename(name: string) {
    const newName = this.renameInputs[name]?.trim();
    if (!newName) return;

    this.store.dispatch(
      ShipActions.updateNameShip({ name, newName })
    );
    this.renameInputs[name] = '';
  }

  updateSpeed(name: string) {
    const newSpeed = this.speedInputs[name];
    if (newSpeed == null || isNaN(newSpeed)) return;

    this.store.dispatch(
      ShipActions.updateSpeedShip({ name, newSpeed })
    );
    this.speedInputs[name] = 0;
  }

  /** trackBy to preserve row DOM and input states */
  trackByName(_index: number, ship: Ship): string {
    return ship.name;
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
  }
}

export {};
