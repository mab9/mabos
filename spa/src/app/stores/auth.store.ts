import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";
import {User} from "../model/user.model";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  // @ts-ignore
  private subject = new BehaviorSubject<User>(null);
  user$ : Observable<User> = this.subject.asObservable();

  isLoggedIn$ : Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private authService : AuthService,
              private readonly keycloak: KeycloakService) {

      this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
      this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
  }

  login()  {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout(environment.keycloak.logout_redirectUri);
  }

  loadMe () {
    this.authService.getMe()
      .subscribe(user => this.subject.next(user));
  }

  update(item : User) {
    this.subject.next(item); // reflect changes to subscribers

    // we do not show any loading indicator because changes are reflected instantly.
    this.authService.put(item).subscribe();
  }
}
