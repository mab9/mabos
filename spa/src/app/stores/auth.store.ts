import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";
import {User} from "../model/user.model";

const AUTH_ACCESS_TOKEN = "AUTH_ACCESS_TOKEN"

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  // @ts-ignore
  private subject = new BehaviorSubject<User>(null);
  user$ : Observable<User> = this.subject.asObservable();

  isLoggedIn$ : Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient,
              private readonly keycloak: KeycloakService) {

      this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
      this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
  }

  login()  {
    this.keycloak.login();
  }

  logout() {
    sessionStorage.removeItem(AUTH_ACCESS_TOKEN);
    this.keycloak.logout(environment.keycloak.logout_redirectUri);
  }

  loadUser () {
    console.info("testy")
    this.http.get<User>('http://localhost:8080/api/users/me', { observe: 'response',withCredentials: true })
      .pipe(
        // @ts-ignore
        catchError(err => {
          console.error("errror ")
          return throwError(err);

        }),
      ).subscribe(user => {
        this.subject.next(user.body!);
    })

  }
}
