// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rooturl : 'http://localhost:8080',
  keycloak : {
    config_url: 'http://localhost:8180/',
    config_realm: 'mabos-realm',
    config_clientId: 'mabos-public-client',
    initOptions_pkceMethod: "S256", // todo check why this property is not working
    initOptions_redirectUri: 'http://localhost:4200/dashboard',
    logout_redirectUri: 'http://localhost:4200/landing',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
