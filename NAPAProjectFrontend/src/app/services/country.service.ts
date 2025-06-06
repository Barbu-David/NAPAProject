import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Country } from '../models/country.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl = 'http://localhost:8080/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

  getCountryVisited(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${encodeURIComponent(name)}`);
  }

  addCountry(country: Country): Observable<string> {
    return this.http.post<string>(this.baseUrl, country);
  }

  deleteCountry(name: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(name)}`);
  }

  updateNameCountry(name: string, newName: string): Observable<void> {
    const url = `${this.baseUrl}/${encodeURIComponent(name)}`;
    return this.http.put<void>(
      url,
      JSON.stringify(newName),                     
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

}

export {};