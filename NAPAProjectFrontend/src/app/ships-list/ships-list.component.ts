import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, interval, Observable } from 'rxjs';

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
  imports:     [
    CommonModule,        // for *ngIf, *ngFor
    ReactiveFormsModule, // for [formGroup]
  ],
})
export class ShipsListComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  // only declare here, assign in constructor or ngOnInit
  ships$!: Observable<Ship[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private refreshSub!: Subscription;

  constructor(
    private store: Store,      // ← injected before constructor body
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // initialize your form
    this.form = this.fb.group({
      name:  ['', Validators.required],
      speed: [0, [Validators.required, Validators.min(1)]]
    });

    // now safe to reference this.store
    this.ships$   = this.store.select(selectShipList);
    this.loading$ = this.store.select(selectShipLoading);
    this.error$   = this.store.select(selectShipError);

    // initial load + polling
    this.store.dispatch(ShipActions.loadShips());
    this.refreshSub = interval(5000)
      .subscribe(() => this.store.dispatch(ShipActions.loadShips()));
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

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
  }
}
