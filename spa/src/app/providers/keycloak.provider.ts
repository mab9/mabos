import {KeycloakService} from "keycloak-angular";
import {APP_INITIALIZER, Provider} from "@angular/core";
import {environment} from "../../environments/environment";

const initializeKeycloak = (keycloak: KeycloakService) => {
  return () => {
    return keycloak.init({
      config: {
        url: environment.keycloak.config_url,
        realm: environment.keycloak.config_realm,
        clientId: environment.keycloak.config_clientId,
      },
      initOptions: {
        pkceMethod: "S256", // todo check why this property is not working
        redirectUri: environment.keycloak.initOptions_redirectUri,
      },
      enableBearerInterceptor: true,
      loadUserProfileAtStartUp: true
    });
  };
}

export const providerKeycloakInitializer : Provider  = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService],
}
