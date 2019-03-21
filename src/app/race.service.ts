import { Injectable } from '@angular/core';
import { RaceModel } from './models/races.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: Array<RaceModel> = [];

  constructor() { }

  list(): Array<RaceModel> {
    this.races = [
      {name: 'Lyon'},
      {name: 'Los Angeles'},
      {name: 'Sydney'},
      {name: 'Tokyo'},
      {name: 'Casablanca'}
    ];

    return this.races;
  }
}
