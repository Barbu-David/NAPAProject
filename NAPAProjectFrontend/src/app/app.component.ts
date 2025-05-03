// src/app/app.component.ts
import { Component }        from '@angular/core';
import { RouterOutlet }     from '@angular/router';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { CommonModule }     from '@angular/common';

@Component({
  selector:    'app-root',
  standalone:  true,                        
  imports:     [RouterOutlet, ShipsListComponent, CommonModule,],
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css']       
})
export class AppComponent {
  title = 'NAPAProjectFrontend';
}
