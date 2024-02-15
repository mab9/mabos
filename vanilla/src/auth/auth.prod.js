import "../../keycloak.js"
import {maybe} from "../assets/util/maybe.js";
import {authLocalController} from "./auth.local.js"
import {config} from "../../config.js";


export {AuthController}

/**
 * @typedef AuthController
 * @property {Function} login
 * @property {Function} logout
 * @property {Function} isLoggedIn
 * @property {Function} register
 * @property {Function} init
 * @property {Function} getUserDetails
 */
const authController = () => {

    // https://github.com/ahus1/keycloak-dropwizard-integration/blob/master/keycloak-dropwizard-bearer/src/main/resources/assets/ajax/app.js
    const keycloak = new Keycloak("./keycloak.json");
    const init = () => keycloak.init({onLoad: 'check-sso'}); // check-sso does not enforce an auth step.

    // some examples that may be used
    // keycloak.onAuthSuccess =  // show privileged page //
    // keycloak.onAuthError = // show welcome page
    // keycloak.onAuthRefreshSuccess =
    // keycloak.onAuthRefreshError =  // show page x / login?

    const login = () => maybe(!keycloak.authenticated)(() => keycloak.login())

    const register = () => keycloak.register();

    const logout = () => {
        maybe(keycloak.authenticated)(() => keycloak.logout())
        keycloak.clearToken();
    }

    const getAccessTokenPayload = () => JSON.parse(atob(keycloak.token.split(".")[1]));

    const getUserDetails = () => {
        const jwtPayload = getAccessTokenPayload();
        return  {
            groups: jwtPayload.groups,
            roles: jwtPayload.realm_access.roles, // todo remove default roles? slice[..]
            email: jwtPayload.email,
            firstname: jwtPayload.given_name,
            lastname: jwtPayload.family_name,
        }
    }

    return Object.freeze({
        login: login,
        logout: logout,
        isLoggedIn: () => keycloak.authenticated,
        register: register,
        init: init,
        getUserDetails: getUserDetails,
    })
}

let AuthController;

// todo rethink about the dependency to both controllers
if (config.environment === 'local') {
    AuthController = authLocalController();
} else {
    AuthController = authController();
}







