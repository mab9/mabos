import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideNativeDateAdapter} from "@angular/material/core";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";

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
      loadUserProfileAtStartUp: false
    });
}

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    KeycloakService
  ]
};
