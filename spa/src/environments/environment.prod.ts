
const host = 'https://abos.mab.rocks'
const iam = 'https://iam.mab.rocks'

export const environment = {
  production: true,
  backendUrl : host + ':8443',
  keycloak : {
    config_url:  iam + '/',
    config_realm: 'mabos-realm',
    config_clientId: 'mabos-public-client',
    initOptions_pkceMethod: "S256", // todo check why this property is not working
    initOptions_redirectUri:  host + '/dashboard',
    logout_redirectUri:  host + '/landing',
  }
};
