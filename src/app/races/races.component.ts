import { Component, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  races: Array<RaceModel> = [];
  size = 0;
  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.size = 4;
    this.raceService.list().subscribe(
      races => this.races = races
    );
  }
}
