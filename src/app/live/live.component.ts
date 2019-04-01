import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  winners: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;
  betWon: boolean;
  error: boolean;
  raceId: string;

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.raceId = this.route.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService.get(+this.raceId)
      .pipe(
        tap(race => this.raceModel = race),
        filter(race => race.status !== 'FINISHED'),
        switchMap(
          race => this.raceService.live(+race.id)
        )
      )
      .subscribe(
        next => {
          this.poniesWithPosition = next;
          this.raceModel.status = 'RUNNING';
        },
        error => this.error = true,
        () => {
          this.raceModel.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(
            ponyWithPosition => ponyWithPosition.position >= 100
          );
          this.betWon = this.winners.some(
            ponyWithPosition => ponyWithPosition.id === this.raceModel.betPonyId
          );
        }
      )
    ;
  }

  ngOnDestroy() {
    if (this.poniesWithPosition) {
      this.positionSubscription.unsubscribe();
    }
  }

}
