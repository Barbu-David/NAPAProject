import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, interval, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as PortActions from '../state/ports/ports.actions';
import {
  selectPortList,
  selectPortLoading,
  selectPortError
} from '../state/ports/ports.selectors';

import { Port } from '../models/port.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ports-list',
  templateUrl: './ports-list.component.html',
  standalone: true,
  styleUrls: ['./ports-list.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class PortsListComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  ports$!: Observable<Port[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  renameInputs: { [portName: string]: string } = {};
  countryInputs: { [portName: string]: string } = {};

  private refreshSub!: Subscription;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.ports$ = this.store.select(selectPortList);
    this.loading$ = this.store.select(selectPortLoading);
    this.error$ = this.store.select(selectPortError);

    this.store.dispatch(PortActions.loadPorts());
    this.refreshSub = interval(1000)
      .subscribe(() => this.store.dispatch(PortActions.loadPorts()));
  }

  add() {
    if (this.form.valid) {
      const port: Port = { name: this.form.value.name, country: this.form.value.country };
      this.store.dispatch(PortActions.addPort({ port }));
      this.form.reset({ name: '', country: '' });
    }
  }

  delete(name: string) {
    this.store.dispatch(PortActions.deletePort({ name }));
  }

  rename(name: string) {
    const newName = this.renameInputs[name]?.trim();
    if (!newName) return;

    this.store.dispatch(
      PortActions.updateNamePort({ name, newName })
    );
    this.renameInputs[name] = '';
  }

  updateCountry(name: string) {
    const newCountry = this.countryInputs[name]?.trim();
    if (!newCountry) return;

    this.store.dispatch(
      PortActions.updateCountryPort({ name, newCountry })
    );
    this.countryInputs[name] = '';
  }

  trackByName(_index: number, port: Port): string {
    return port.name;
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
  }
}

export {};
