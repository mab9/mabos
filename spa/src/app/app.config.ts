import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClientModule, provideHttpClient, withFetch, withXsrfConfiguration} from "@angular/common/http";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {KeycloakService} from "keycloak-angular";
import {providerKeycloakBearerInterceptor, providerKeycloakInitializer} from "./providers/keycloak.provider";

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideNativeDateAdapter(),
    KeycloakService,
    providerKeycloakInitializer,
    providerKeycloakBearerInterceptor,
    provideHttpClient(
      withFetch(),
      withXsrfConfiguration(
      {
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      },

    )),
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
  ]
};
