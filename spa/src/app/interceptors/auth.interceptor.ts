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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler,):
    Observable<HttpEvent<any>> {
    console.info("auth interceptor")

    let httpHeaders = new HttpHeaders();
    let AUTH_TOKEN = sessionStorage.getItem('auth');
    if (AUTH_TOKEN) {
      httpHeaders = new HttpHeaders().append('Authorization', 'bearer ' + AUTH_TOKEN);
    }

    const newRequest = req.clone({
      headers: httpHeaders
    });

    return next.handle(newRequest);
  }
}

export const providerAuthInterceptor: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};
