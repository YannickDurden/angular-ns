import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: Array<RaceModel> = [];

  constructor(private httpClient: HttpClient) { }

  list() {
    const urlListPendingRaces = environment.baseUrl + '/api/races?status=PENDING';

    return this.httpClient.get<Array<RaceModel>>(urlListPendingRaces);
  }
}
