import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;
  raceId: string;

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.raceId = this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(+this.raceId).subscribe(
      race => this.raceModel = race
    );

    this.positionSubscription = this.raceService.live(+this.raceId).subscribe(
      ponies => { this.poniesWithPosition = ponies; }
    );
  }

  ngOnDestroy() {
    if (this.poniesWithPosition) {
      this.positionSubscription.unsubscribe();
    }
  }

}
