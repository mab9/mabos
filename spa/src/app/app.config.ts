import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClientModule, provideHttpClient, withFetch, withXsrfConfiguration} from "@angular/common/http";
import {provideNativeDateAdapter} from "@angular/material/core";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {providerAuthInterceptor} from "./interceptors/auth.interceptor";

// todo replace with properties - in env file?
export const initializeKeycloak = (keycloak: KeycloakService) => {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8180/',
        realm: 'mabos-realm',
        clientId: 'mabos-public-client',
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: 'http://localhost:4200/dashboard',
      },
      enableBearerInterceptor: true,
      loadUserProfileAtStartUp: false
    });
}

export const providerKeycloakInitializer : Provider  = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService],
}

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideNativeDateAdapter(),
    KeycloakService,
    providerKeycloakInitializer,
    providerAuthInterceptor,
    provideHttpClient(
      withFetch(),
      withXsrfConfiguration(
      {
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      },

    )),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
  ]
};
