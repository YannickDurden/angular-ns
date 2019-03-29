import { Injectable, Inject, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Client, Subscription } from 'webstomp-client';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(
    @Inject(WEBSOCKET) private WebSocket: Type<WebSocket>,
    @Inject(WEBSTOMP) private WebStomp: any
  ) { }

  connect<T>(channel: string): Observable<T> {
    const url = environment.wsBaseUrl + '/ws';
    const connection: WebSocket = new this.WebSocket(url);
    const stompClient: Client = this.WebStomp.over(connection);
    let subscription: Subscription;

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
