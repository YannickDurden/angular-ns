import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  private token: string;
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      const header = {
        Authorization: 'Bearer ' + this.token
      };
      const newRequest = request.clone({ setHeaders: header });

      return next.handle(newRequest);
    }

    return next.handle(request);
  }

  setJwtToken(token: string) {
    this.token = token;
  }

  removeJwtToken() {
    this.token = null;
  }
}
