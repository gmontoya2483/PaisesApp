import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../interfaces/pais.interface';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl = 'https://restcountries.eu/rest/v2';

  get httpParams(): HttpParams {
    return new HttpParams()
      .set('fields', 'name;capital;alpha2Code;flag;population');
  }

  constructor(private http: HttpClient) { }

  public buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  public buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  public getPaisPorAlpha(termino: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${termino}`;
    return this.http.get<Country>(url);
  }

  public buscarRegion(region: string): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url, { params: this.httpParams }).pipe(
      tap (console.log)
    );
  }


}
