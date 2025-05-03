import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Port } from '../models/port.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PortService {
  private baseUrl = 'http://localhost:8080/ports';

  constructor(private http: HttpClient) {}

  getPorts(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

  getPortCountry(name: string): Observable<string> {
    return this.http.get(
      `${this.baseUrl}/${encodeURIComponent(name)}/country`,
      { responseType: 'text' }
    );
  }

  addPort(port: Port): Observable<string> {
    return this.http.post<string>(this.baseUrl, port);
  }

  deletePort(name: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(name)}`);
  }

  updateNamePort(name: string, newName: string): Observable<void> {
    const url = `${this.baseUrl}/${encodeURIComponent(name)}`;
    return this.http.put<void>(
      url,
      JSON.stringify(newName),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  updateCountryPort(name: string, newCountry: string): Observable<void> {
    const url = `${this.baseUrl}/${encodeURIComponent(name)}/country`;
    return this.http.put<void>(
      url,
      JSON.stringify(newCountry),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}

export {};
