import "../../keycloak.js"
import {Attribute, setValueOf} from "../base/presentationModel/presentationModel.js";

export {authLocalController}

/**
 * @typedef AuthLocalController
 * @property {Function} login
 * @property {Function} logout
 *
 * Mock of authController to avoid running keycloak for frontend dev.
 */
const authLocalController = () => {

    const loggedIn = Attribute(false);

    const keycloak = {
        onReady: undefined,
        then: () => new Promise(() => undefined),  // don't handle it, not used at the moment
        catch: () => undefined,  // don't handle it, not used at the moment
    }

    const init = () => {
        setTimeout(() => keycloak.onReady(false), 500);
        return keycloak;
    }

    const login = () => {
        setValueOf(loggedIn)(true);
        keycloak.onReady(true);
    }

    const register = () => alert("Not implemented for local development");

    const logout = () => {
        alert("Not implemented for local development");
        setValueOf(loggedIn)(false);
    }

    /*
        example how to fake promise values.
        const loadUserProfile = () => {
            const profile = {email: "mab9.test@gmail.com"};
            return new Promise(res => res(profile))
        }

     */

    const fakeAccessTokenAdmin = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTMm05TE95aGcyTDBRZm9UZ0RTSXZ0R0JMUENsTzZiWTJ6UGphWUVpcTVRIn0.eyJleHAiOjE2MTA1MjY1NTUsImlhdCI6MTYxMDUyNjI1NSwiYXV0aF90aW1lIjoxNjEwNTI2MjUzLCJqdGkiOiIwZDgwMTBiNC0yNDgwLTQxMzUtOGMxYi00NmEwMzFjODRlMmUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvdmFrYW5zaWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzExNzA1MmEtMWFhYy00MTgzLWE5YTktYzY5ZjE0Yjk4MTJiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidmFrYW5zaWUiLCJub25jZSI6ImFhNWJjYjc5LWEwYWYtNGZiMC05OTg0LTAwOTkzOTIwZmM2YyIsInNlc3Npb25fc3RhdGUiOiJiMDZmMDI5YS03YTFiLTQ4ZjQtYjEzOS04ODVkN2IyZTg2NzciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NjMzNDIiLCIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbi10ZW5hbnQiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iLCJlbXBsb3llZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Im1hYiBiYW0iLCJncm91cHMiOlsiamF2YSIsInNpZSJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYWI5LnRlc3RAZ21haWwuY29tIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoibWFiIiwiZmFtaWx5X25hbWUiOiJiYW0iLCJlbWFpbCI6Im1hYjkudGVzdEBnbWFpbC5jb20ifQ.JvnIoWFKTVIQij_Sv5KsZv-G0rN8SSmP5JrFWv0Cz4PICGDst0U9lQl_nIp8XEerFCZ1y1vc855FwleIT8VaNTxwAMOaHrb4IgoVKuANOdBBzNFWTaKLvqj4tMFeibgM4_XPRWxDzzDyn9A8iP2A7Z0l7rnwdIUuIavtlvKjp_h1obphnpFFJG3aBUgJViK_Eo18_dD8DdhVwegWIuHz-m8zzcb3RyvP0Fhu7WzoadEFCUA2QMsEnY4l6E1STK0YOZjtvofx4tZQu1Bsm_17lt5bp50p9I0cyPFYOmCm8rMa29hEuM2VugPA-XA3z8TkblQsmu2xHYikWAWQa3z_Hw";
    const fakeAccessTokenEmployee = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTMm05TE95aGcyTDBRZm9UZ0RTSXZ0R0JMUENsTzZiWTJ6UGphWUVpcTVRIn0.eyJleHAiOjE2MTA1MjY2NDYsImlhdCI6MTYxMDUyNjM0NiwiYXV0aF90aW1lIjoxNjEwNTI2MzQ0LCJqdGkiOiJiMjY4ZDllMS0zYjJmLTQ0M2MtYWZlMC1mYmJhZDQ4ZDdmZDEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvdmFrYW5zaWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMTdhMDQxODgtZmVkYy00YmZhLWI1MmYtNjAzM2FmNjQ0NzhiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidmFrYW5zaWUiLCJub25jZSI6IjJiMDM3YmU5LTEyYmQtNDMwZS1iYzAzLTk4NGNlNDAwYzMyOCIsInNlc3Npb25fc3RhdGUiOiIwZmJkY2EzOS1mNzM0LTQ0MzktOTNjMC0zMzM2YjNhNGQ2N2EiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NjMzNDIiLCIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZW1wbG95ZWUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJNYXJjLUFudG9pbmUgQnJ1ZWxoYXJ0IiwiZ3JvdXBzIjpbInNpZSIsInN2diJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXJjYW50b2luZS5icnVlbGhhcnRAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ik1hcmMtQW50b2luZSIsImZhbWlseV9uYW1lIjoiQnJ1ZWxoYXJ0IiwiZW1haWwiOiJtYXJjYW50b2luZS5icnVlbGhhcnRAZ21haWwuY29tIn0.QjeG4Wva69oNVxbUviQw6uSrVl-IOSJ1Zve_c9iflY3Ts-lx_12Q84q2OscG_Z_YeDv2j5qZHXJMt5zuMajD0vqMCJU3vhOPO84yE03UBZIERPKoU0TFgfaYwCIIID7--0vdLDscpHJAjKrgQWGNDvRtTh1TiFu0i0hR3XkC3a5dH4DtO1jlWSVY-w2ijdvA8SbFBQVY86PY_I_nwsyEFd63cH2ad1P53uak6WAPq-JhgKGiEuRWLRmAwzv-LnCCkF_bpxy65VE_X7op0rb2PeyQ8R1RftZW7Y7KgNFQ2NTpPDLqDTkb_jETdqwUD_rTMxKD-BQ3kAqEhlUgn-YMWw";
    const getAccessTokenPayload = () => JSON.parse(atob(fakeAccessTokenAdmin.split(".")[1]));

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
        getUserDetails: getUserDetails,  // return fake profile
    })
}
