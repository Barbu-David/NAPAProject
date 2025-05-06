import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, interval, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


import * as CountryActions from '../../state/countries/countries.actions';
import {
  selectCountriesList,
  selectCountryLoading,
  selectCountryError
} from '../../state/countries/countries.selectors';
import { Country } from '../../models/country.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-list',
  templateUrl: './countries-list.component.html',
  standalone:  true,
  styleUrls: ['./countries-list.component.css'] ,
  imports:     [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class CountryListComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  countries$!:       Observable<Country[]>;
  loading$!:     Observable<boolean>;
  error$!:       Observable<string | null>;

  renameInputs: { [CountryName: string]: string } = {};

  private refreshSub!: Subscription;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name:  ['', Validators.required],
      visited: [false, [Validators.required]]
    });

    this.countries$   = this.store.select(selectCountriesList);
    this.loading$ = this.store.select(selectCountryLoading);
    this.error$   = this.store.select(selectCountryError);

    this.store.dispatch(CountryActions.loadCountries());
    this.refreshSub = interval(1000)
      .subscribe(() => this.store.dispatch(CountryActions.loadCountries()));
  }

  add() {
    if (this.form.valid) {
      const countries: Country  = this.form.value;
      this.store.dispatch(CountryActions.addCountry({ countries }));
      this.form.reset({ name: '', speed: 0 });
    }
  }

  delete(name: string) {
    this.store.dispatch(CountryActions.deleteCountry({ name }));
  }

  rename(name: string) {
    const newName = this.renameInputs[name]?.trim();
    if (!newName) return;

    this.store.dispatch(
      CountryActions.updateNameCountry({ name, newName })
    );
    this.renameInputs[name] = '';
  }

  trackByName(_index: number, country: Country): string {
    return country.name;
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
  }
}

export {};