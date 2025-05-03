import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as VoyageActions from '../state/voyages/voyages.actions';
import {
  selectVoyageList,
  selectVoyageLoading,
  selectVoyageError
} from '../state/voyages/voyages.selectors';

import { Voyage } from '../models/voyage.model';

@Component({
  selector: 'app-voyages-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.css']
})
export class VoyagesListComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  voyages$!: Observable<Voyage[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  dateInputs:    { [key: number]: string } = {};
  startInputs:   { [key: number]: string } = {};
  endInputs:     { [key: number]: string } = {};

  private refreshSub!: Subscription;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      departurePort: ['', Validators.required],
      arrivalPort:   ['', Validators.required],
      date:          [''],                     // optional
      startTime:     ['', Validators.required],
      endTime:       ['', Validators.required],
    });

    this.voyages$ = this.store.select(selectVoyageList);
    this.loading$ = this.store.select(selectVoyageLoading);
    this.error$   = this.store.select(selectVoyageError);

    this.store.dispatch(VoyageActions.loadVoyages());
    this.refreshSub = interval(1000).subscribe(() =>
      this.store.dispatch(VoyageActions.loadVoyages())
    );
  }

  add() {
    if (!this.form.valid) return;
    const voyage: Voyage = this.form.value;
    this.store.dispatch(VoyageActions.addVoyage({ voyage }));
    this.form.reset();
  }

  delete(id?: number) {
    if (id == null) return;
    this.store.dispatch(VoyageActions.deleteVoyage({ id }));
  }

  updateDate(id?: number) {
    const val = id != null && this.dateInputs[id]?.trim();
    if (!val) return;
    this.store.dispatch(VoyageActions.updateDate({ id: id!, date: val }));
    this.dateInputs[id!] = '';
  }

  updateStart(id?: number) {
    const val = id != null && this.startInputs[id]?.trim();
    if (!val) return;
    this.store.dispatch(VoyageActions.updateStartTime({ id: id!, startTime: val }));
    this.startInputs[id!] = '';
  }

  updateEnd(id?: number) {
    const val = id != null && this.endInputs[id]?.trim();
    if (!val) return;
    this.store.dispatch(VoyageActions.updateEndTime({ id: id!, endTime: val }));
    this.endInputs[id!] = '';
  }

  trackById(_i: number, v: Voyage) {
    return v.id ?? _i;
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
  }
}
