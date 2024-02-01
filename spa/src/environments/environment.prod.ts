export const environment = {
  production: true,
  backendUrl : 'http://localhost:8080',
  keycloak : {
    config_url: 'http://localhost:8180/',
    config_realm: 'mabos-realm',
    config_clientId: 'mabos-public-client',
    initOptions_pkceMethod: "S256", // todo check why this property is not working
    initOptions_redirectUri: 'http://localhost:4200/dashboard',
    logout_redirectUri: 'http://localhost:4200/landing',
  }
};
