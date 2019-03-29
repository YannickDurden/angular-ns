import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import * as Webstomp from 'webstomp-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }

  connect(channel: string): Observable<any> {
    const url = environment.wsBaseUrl + '/ws';
    const connection: WebSocket = new WebSocket(url);
    const stompClient: Webstomp.Client = Webstomp.over(connection);
    let subscription: Webstomp.Subscription;

    return new Observable(
      observer => {
        stompClient.connect(
          { login: null, passcode: null },
          () => {
            subscription = stompClient.subscribe(channel, message => {
              const bodyAsJson = JSON.parse(message.body);
              observer.next(bodyAsJson);
            });
          },
          error => {
            observer.error(error);
          }
        );

        return () => {
          if (subscription) {
            subscription.unsubscribe();
          }

          connection.close();
        };
      }
    );
  }
}
