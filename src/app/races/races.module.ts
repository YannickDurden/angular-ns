import { NgModule } from '@angular/core';
import { RACES_ROUTES } from './races.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FromNowPipe } from '../from-now.pipe';
import { RacesComponent } from './races.component';
import { BetComponent } from '../bet/bet.component';
import { RaceComponent } from '../race/race.component';
import { PonyComponent } from '../pony/pony.component';
import { LiveComponent } from '../live/live.component';
import { PendingRacesComponent } from './pending-races/pending-races.component';
import { FinishedRacesComponent } from './finished-races/finished-races.component';
import { SharedModule } from '../shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RacesComponent,
    RaceComponent,
    PendingRacesComponent,
    FinishedRacesComponent,
    PonyComponent,
    BetComponent,
    LiveComponent,
    FromNowPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RACES_ROUTES),
    SharedModule,
    NgbPaginationModule
  ]
})
export class RacesModule { }
