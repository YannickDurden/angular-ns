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

  constructor(private httpClient: HttpClient) {
    this.retrieveUser();
   }

   /**
    * Enregistre un utilisateur
    *
    * @param login string
    * @param password string
    * @param birthYear number
    *
    * @returns Observable<UserModel>
    */
  register(login: string, password: string, birthYear: number) {
    const registration: RegistrationModel = { login, password, birthYear };

    return this.httpClient.post<RegistrationModel>(this.userRegistrationUrl, registration);
  }

  /**
   * Connexion utilisateur
   *
   * @param credentials object
   *
   * @returns Observable<UserModel>
   */
  authenticate(credentials: {login: string; password: string}) {
    return this.httpClient
      .post<UserModel>(this.userAuthenticationUrl, credentials)
      .pipe(
        tap(user => this.storeLoggedInUser(user))
      );
  }

  /**
   * Stocke les informations utilisateur dans le localStorage à la connexion
   * @param user UserModel
   */
  storeLoggedInUser(user: UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }

  /**
   * Récupère les informations utilisateur dans le localStorage
   */
  retrieveUser() {
    const userFromLocalStorage = window.localStorage.getItem('rememberMe');
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      this.userEvents.next(user);
    }
  }
}
