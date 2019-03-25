import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RegistrationModel } from './models/registration.model';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from './models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRegistrationUrl = environment.baseUrlApiNinjaSquad + '/api/users';
  userAuthenticationUrl = environment.baseUrlApiNinjaSquad + '/api/users/authentication';
  userEvents: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private httpClient: HttpClient) { }

  register(login: string, password: string, birthYear: number) {
    const registration: RegistrationModel = { login, password, birthYear };

    return this.httpClient.post<RegistrationModel>(this.userRegistrationUrl, registration);
  }

  authenticate(credentials: {login: string; password: string}) {
    return this.httpClient.post<UserModel>(this.userAuthenticationUrl, credentials).pipe(
      tap(response => this.userEvents.next(response)),
    );
  }
}
