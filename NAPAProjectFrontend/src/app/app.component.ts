import { Component }        from '@angular/core';
import { RouterOutlet }     from '@angular/router';
import { CountryListComponent } from './components/countries-list/countries-list.component';
import { ShipsListComponent } from './components/ships-list/ships-list.component';
import { PortsListComponent } from './components/port-list/ports-list.component';
import { VoyagesListComponent } from './components/voyage-list/voyage-list.component';
import { CommonModule }     from '@angular/common';

@Component({
  selector:    'app-root',
  standalone:  true,                        
  imports:     [RouterOutlet, ShipsListComponent, CommonModule, CountryListComponent, PortsListComponent, VoyagesListComponent],
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css']       
})
export class AppComponent {
  title = 'NAPAProjectFrontend';
}
