import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription, Subject, interval, EMPTY } from 'rxjs';
import { filter, switchMap, groupBy, mergeMap, bufferToggle, throttleTime, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  winners: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription;
  clickSubject: Subject<PonyWithPositionModel> = new Subject<PonyWithPositionModel>();
  betWon: boolean;
  error: boolean;
  raceId: string;

  constructor(
    private ref: ChangeDetectorRef ,
    private raceService: RaceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.raceModel = this.route.snapshot.data.race;
    if (this.raceModel.status !== 'FINISHED') {
      this.positionSubscription = this.raceService.live(this.raceModel.id)
        .subscribe(
          positions => {
            this.poniesWithPosition = positions;
            this.raceModel.status = 'RUNNING';
            this.ref.markForCheck();
          },
          error => {
            this.error = true;
            this.ref.markForCheck();
          },
          () => {
            this.raceModel.status = 'FINISHED';
            this.winners = this.poniesWithPosition.filter(
              ponyWithPosition => ponyWithPosition.position >= 100
            );
            this.betWon = this.winners.some(
              ponyWithPosition => ponyWithPosition.id === this.raceModel.betPonyId
            );
            this.ref.markForCheck();
          }
        )
      ;
    }
    this.clickSubject
    .pipe(
      groupBy(pony => pony.id, pony => pony.id),
      mergeMap(obs => obs.pipe(bufferToggle(
        obs, () => interval(1000)
      ))),
      filter(obs => obs.length >= 5),
      throttleTime(1000),
      map(ponies => ponies[0]),
      switchMap(
        ponyId => this.raceService.boost(this.raceModel.id, ponyId)
        .pipe(
          catchError(() => EMPTY)
        )
      )
    )
    .subscribe(
      () => {}
    );
  }

  ngOnDestroy() {
    if (this.poniesWithPosition) {
      this.positionSubscription.unsubscribe();
    }
  }

  onClick(pony: PonyWithPositionModel) {
    this.clickSubject.next(pony);
  }

  ponyById(index: number, pony: PonyWithPositionModel) {
    return pony.id;
  }

}
