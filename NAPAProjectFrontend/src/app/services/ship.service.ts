import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ship } from '../models/ship.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShipService {
  private baseUrl = 'http://localhost:8080/ships';

  constructor(private http: HttpClient) {}

  getShips(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

  getShipSpeed(name: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${encodeURIComponent(name)}/topSpeed`);
  }

  addShip(ship: Ship): Observable<string> {
    return this.http.post<string>(this.baseUrl, ship);
  }

  deleteShip(name: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(name)}`);
  }

  updateNameShip(name: string, newName: string): Observable<void> {
  const url = `${this.baseUrl}/${encodeURIComponent(name)}`;
  return this.http.put<void>(
    url,
    JSON.stringify(newName),                     
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  );
}

  updateSpeedShip(name: string, newSpeed: number): Observable<void> {
    const url = `${this.baseUrl}/${encodeURIComponent(name)}/topSpeed`;
    return this.http.put<void>(
      url,
      newSpeed,                                                  
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }    

}

export {};
  