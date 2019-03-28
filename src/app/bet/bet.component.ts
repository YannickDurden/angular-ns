import { Component, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  raceModel: RaceModel;
  idPonySelected?: number;
  betFailed = false;
  raceId: any;

  constructor(private route: ActivatedRoute, private raceService: RaceService) { }

  ngOnInit() {
    this.raceId = this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(this.raceId).subscribe(
      race => this.raceModel = race
    );
  }

  /**
   * Info :
   * Comme la methode post appelé par la méthode bet()
   * n'est pas typé sur RaceModel, il est possible de le faire
   * ici avec .pipe(map()) en réassignant avec le type voulu; Le
   * mieux étant de typer la méthode post()
   *
   * @param pony PonyModel
   */
  betOnPony(pony: PonyModel) {
    if (pony.id === this.raceModel.betPonyId) {
      return this.raceService.cancelBet(this.raceModel.id).subscribe(
        success => this.raceModel.betPonyId = null,
        error => this.betFailed = true
      );
    }

    return this.raceService.bet(this.raceModel.id, pony.id).subscribe(
      race => {
        this.raceModel = race;
        this.idPonySelected = this.raceModel.betPonyId;
      },
      error => this.betFailed = true
    );
  }

  isPonySelected(pony: PonyModel) {
    return this.raceModel.betPonyId === pony.id;
  }
}
