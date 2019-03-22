import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(login: string, password: string, birthYear: number) {
    const registration: UserModel = { login, password, birthYear };
    const userRegistrationUrl = environment.baseUrlApiNinjaSquad + '/api/users';

    return this.httpClient.post<UserModel>(userRegistrationUrl, registration);
  }
}
