import {CanActivateFn, Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import {RouteConstants} from "../constants/route.constants";

export const AuthGuard: CanActivateFn = () :

  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  if (keycloakService.isLoggedIn()) {
    return true;
  } else {
    return router.parseUrl(RouteConstants.ROUTE_LANDING);
  }
};
