import { Injectable } from '@angular/core';
import { RaceModel, LiveRaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PonyWithPositionModel } from './models/pony.model';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: Array<RaceModel> = [];
  raceModel: RaceModel;
  liveRaceModel: LiveRaceModel;

  constructor(private httpClient: HttpClient, private wsService: WsService) { }

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
    const channel = `/race/${raceId}`;

    return this.wsService.connect(channel).pipe(
      map(
        (liveRace => liveRace.ponies)
      )
    );
  }
}
