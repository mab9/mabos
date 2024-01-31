import {Injectable, Provider} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {KeycloakService} from "keycloak-angular";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloak : KeycloakService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler,):
    Observable<HttpEvent<any>> {

    let httpHeaders = new HttpHeaders();
    if (this.keycloak.isLoggedIn()) {
      const token = sessionStorage.getItem("AUTH_ACCESS_TOKEN")
      httpHeaders = new HttpHeaders().append('Authorization', 'bearer ' + token);
    }

    if (req.url.startsWith(environment.backendUrl)) {
      req = req.clone({
        headers: httpHeaders,
        withCredentials: true,
        //observe: 'response'
      });
    }

    return next.handle(req);
  }
}

export const providerAuthInterceptor: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};
