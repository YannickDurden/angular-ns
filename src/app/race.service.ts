import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: Array<RaceModel> = [];

  constructor() { }

  list(): Observable<Array<RaceModel>> {
    this.races = [
      {name: 'Lyon'},
      {name: 'Los Angeles'},
      {name: 'Sydney'},
      {name: 'Tokyo'},
      {name: 'Casablanca'}
    ];

    return of(this.races).pipe(delay(500));
  }
}
