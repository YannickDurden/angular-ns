import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PonyWithPositionModel } from './models/pony.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: Array<RaceModel> = [];
  raceModel: RaceModel;
  ponyWithPositionModel: PonyWithPositionModel;

  constructor(private httpClient: HttpClient) { }

  /**
   * Récupère une liste de courses en attente
   */
  list(): Observable<Array<RaceModel>> {
    const urlListPendingRaces = environment.baseUrl + '/api/races?status=PENDING';

    return this.httpClient.get<Array<RaceModel>>(urlListPendingRaces);
  }

  /**
   * Pari sur un poney
   *
   * @param raceId number
   * @param ponyId numbers
   */
  bet(raceId: number, ponyId: number) {
    const urlPlacingABet = environment.baseUrl + '/api/races/' + raceId + '/bets';

    return this.httpClient.post<RaceModel>(urlPlacingABet, {ponyId});
  }

  /**
   * Récupère une course par son id
   *
   * @param id number
   */
  get(raceId: number): Observable<RaceModel> {
    const urlGetRaceById = environment.baseUrl + '/api/races/' + raceId;

    return this.httpClient.get<RaceModel>(urlGetRaceById);
  }

  cancelBet(raceId: number) {
    const urlCancellingBet = `${environment.baseUrl}/api/races/${raceId}/bets`;

    return this.httpClient.delete(urlCancellingBet);
  }


  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    const positions = interval(1000);
    return positions.pipe(
      map(
        (position => [{
          id: 1,
          name: 'Superb Runner',
          color: 'BLUE',
          position
        }, {
          id: 2,
          name: 'Awesome Fridge',
          color: 'GREEN',
          position
        }, {
          id: 3,
          name: 'Great Bottle',
          color: 'ORANGE',
          position
        }, {
          id: 4,
          name: 'Little Flower',
          color: 'YELLOW',
          position
        }, {
          id: 5,
          name: 'Nice Rock',
          color: 'PURPLE',
          position
        }])
      ),
      take(101)
    );
  }
}
