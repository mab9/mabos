import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
  HammerModule,
  provideClientHydration
} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClientModule, provideHttpClient, withFetch, withXsrfConfiguration} from "@angular/common/http";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {KeycloakService} from "keycloak-angular";
import {providerKeycloakBearerInterceptor, providerKeycloakInitializer} from "./providers/keycloak.provider";


export const appConfig: ApplicationConfig = {

  providers: [
    importProvidersFrom(HttpClientModule, HammerModule),

    provideRouter(routes),
    provideAnimations(),
    provideNativeDateAdapter(),
    KeycloakService,
    providerKeycloakInitializer,
    providerKeycloakBearerInterceptor,

    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
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
  ]
};
