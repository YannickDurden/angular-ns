import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RaceModel } from './models/race.model';
import { RaceService } from './race.service';

@Injectable({
  providedIn: 'root'
})
export class RacesResolverService implements Resolve<Array<RaceModel>> {

  constructor(private raceService: RaceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const status = route.routeConfig.path.toUpperCase();

    return this.raceService.list(status);
  }
}
