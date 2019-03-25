import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserModel } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRegistrationUrl = environment.baseUrlApiNinjaSquad + '/api/users';
  userAuthenticationUrl = environment.baseUrlApiNinjaSquad + '/api/users/authentication';

  constructor(private httpClient: HttpClient) { }

  register(login: string, password: string, birthYear: number) {
    const registration: UserModel = { login, password, birthYear };

    return this.httpClient.post<UserModel>(this.userRegistrationUrl, registration);
  }

  authenticate(credentials: {login: string; password: string}): Observable<any> {
    return this.httpClient.post(this.userAuthenticationUrl, credentials);
  }
}
