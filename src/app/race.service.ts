import { Injectable } from '@angular/core';
import { RaceModel } from './models/races.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: Array<RaceModel> = [];

  constructor() { }

  list(): Array<RaceModel> {
    this.races = [{ name: 'Lyon'}, { name: 'London'}];

    return this.races;
  }
}
