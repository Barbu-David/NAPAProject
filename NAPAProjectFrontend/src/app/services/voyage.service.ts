  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Voyage } from '../models/voyage.model';
  
  @Injectable({ providedIn: 'root' })
  export class VoyageService {
    private baseUrl = 'http://localhost:8080/voyages';
    private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    constructor(private http: HttpClient) {}
  
    getVoyages(): Observable<number[]> {
      return this.http.get<number[]>(this.baseUrl);
    }
  

    getVoyage(id: number): Observable<Voyage> {
      return this.http.get<Voyage>(`${this.baseUrl}/${id}`);
    }

    addVoyage(voyage: Voyage): Observable<number> {
      return this.http.post<number>(
        this.baseUrl,
        voyage,
        { headers: this.jsonHeaders }
      );
    }

    deleteVoyage(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getArrivalPort(id: number): Observable<string> {
      return this.http.get(
        `${this.baseUrl}/${id}/arrivalPort`,
        { responseType: 'text' }
      );
    }
  
    getDeparturePort(id: number): Observable<string> {
      return this.http.get(
        `${this.baseUrl}/${id}/departurePort`,
        { responseType: 'text' }
      );
    }
  
    getDate(id: number): Observable<string> {
      return this.http.get(
        `${this.baseUrl}/${id}/date`,
        { responseType: 'text' }
      );
    }
  
    getStartTime(id: number): Observable<string> {
      return this.http.get(
        `${this.baseUrl}/${id}/start`,
        { responseType: 'text' }
      );
    }
  
    getEndTime(id: number): Observable<string> {
      return this.http.get(
        `${this.baseUrl}/${id}/end`,
        { responseType: 'text' }
      );
    }
  

    updateArrivalPort(id: number, port: string): Observable<void> {
      return this.http.put<void>(
        `${this.baseUrl}/${id}/arrivalPort`,
        JSON.stringify(port),
        { headers: this.jsonHeaders }
      );
    }
  
    updateDeparturePort(id: number, port: string): Observable<void> {
      return this.http.put<void>(
        `${this.baseUrl}/${id}/departurePort`,
        JSON.stringify(port),
        { headers: this.jsonHeaders }
      );
    }
  
    updateDate(id: number, date: string): Observable<void> {
      return this.http.put<void>(
        `${this.baseUrl}/${id}/date`,
        JSON.stringify(date),
        { headers: this.jsonHeaders }
      );
    }
      updateStartTime(id: number, startTime: string): Observable<void> {
      return this.http.put<void>(
        `${this.baseUrl}/${id}/start`,
        JSON.stringify(startTime),
        { headers: this.jsonHeaders }
      );
    }
  
    updateEndTime(id: number, endTime: string): Observable<void> {
      return this.http.put<void>(
        `${this.baseUrl}/${id}/end`,
        JSON.stringify(endTime),
        { headers: this.jsonHeaders }
      );
    }
  }
  