import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICountry } from '../shared/shared.models';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(
    private http: HttpClient
  ) { }

  getBoardList(): Promise<ICountry[]> {
    return this.http.get<ICountry[]>(
      environment.api + environment.apiCountries + environment.apiBoard
    ).toPromise();
  }
}
