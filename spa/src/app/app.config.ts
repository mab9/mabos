import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClientModule, provideHttpClient, withFetch, withXsrfConfiguration} from "@angular/common/http";
import {provideNativeDateAdapter} from "@angular/material/core";
import {KeycloakService} from "keycloak-angular";
import {providerAuthInterceptor} from "./interceptors/auth.interceptor";
import {providerKeycloakInitializer} from "./providers/keycloak.provider";

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
