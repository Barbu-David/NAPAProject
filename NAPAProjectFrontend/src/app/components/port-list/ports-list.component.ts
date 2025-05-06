import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, interval, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

import * as PortActions from '../../state/ports/ports.actions';
import {
  selectPortList,
  selectPortLoading,
  selectPortError
} from '../../state/ports/ports.selectors';

import { Port } from '../../models/port.model';
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
export class PortsListComponent implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup;
  ports$!: Observable<Port[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  renameInputs: { [portName: string]: string } = {};
  countryInputs: { [portName: string]: string } = {};

  @ViewChild('pieChart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  private refreshSub!: Subscription;
  private portsSub!: Subscription;

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

    this.portsSub = this.ports$.subscribe(ports => this.drawPie(ports));
  }

  ngAfterViewInit() {
    this.ctx = this.chartRef.nativeElement.getContext('2d');
  }

  private drawPie(ports: Port[]) {
    if (!this.ctx) return;
    const canvas = this.chartRef.nativeElement;
    const size = Math.min(canvas.width, canvas.height);
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    const counts: Record<string, number> = {};
    ports.forEach(p => counts[p.country] = (counts[p.country] || 0) + 1);
    const labels = Object.keys(counts);
    const values = Object.values(counts);
    const total = values.reduce((sum, v) => sum + v, 0);
    if (total === 0) return;

    let startAngle = 0;
    const colors = ['#FF6384','#36A2EB','#FFCE56','#4CAF50','#9C27B0','#F44336','#2196F3'];

    labels.forEach((label, i) => {
      const slice = values[i] / total * 2 * Math.PI;
      this.ctx!.beginPath();
      this.ctx!.moveTo(size/2, size/2);
      this.ctx!.arc(size/2, size/2, size/2 - 10, startAngle, startAngle + slice);
      this.ctx!.closePath();
      this.ctx!.fillStyle = colors[i % colors.length];
      this.ctx!.fill();


      const mid = startAngle + slice / 2;
      const x = size/2 + Math.cos(mid) * (size/2 - 30);
      const y = size/2 + Math.sin(mid) * (size/2 - 30);
      this.ctx!.fillStyle = '#000';
      this.ctx!.font = '12px Arial';
      this.ctx!.fillText(`${label} (${Math.round(values[i] / total * 100)}%)`, x - 20, y);

      startAngle += slice;
    });
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
    this.store.dispatch(PortActions.updateNamePort({ name, newName }));
    this.renameInputs[name] = '';
  }

  updateCountry(name: string) {
    const newCountry = this.countryInputs[name]?.trim();
    if (!newCountry) return;
    this.store.dispatch(PortActions.updateCountryPort({ name, newCountry }));
    this.countryInputs[name] = '';
  }

  trackByName(_i: number, p: Port) {
    return p.name;
  }

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
    this.portsSub.unsubscribe();
  }
}
