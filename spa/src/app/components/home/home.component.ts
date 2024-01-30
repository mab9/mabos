import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {AbosStore} from "../../stores/abos.store";
import {HttpClient} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {User} from "../../model/user.model";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatList,
    MatListItem,
    MatIcon,
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  constructor(public abosStore : AbosStore,
              private http : HttpClient,
              private readonly keycloak: KeycloakService) {

  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    console.info("is user logged in", this.isLoggedIn)

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      window.sessionStorage.setItem("userdetails",JSON.stringify(this.userProfile));
      const token = await  this.keycloak.getToken();
      sessionStorage.setItem("auth", token);
    }
  }

  async loadUser () {
    this.http.get<User>('http://localhost:8080/api/users/me', { observe: 'response',withCredentials: true })
      .pipe(
        // @ts-ignore
        catchError(err => {
          console.error("errror ")
          return throwError(err);

        }),
      ).subscribe(user => console.info("loaded user", user))

  }
}
