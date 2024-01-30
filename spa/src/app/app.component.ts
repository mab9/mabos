import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatBadge} from "@angular/material/badge";
import {KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
    MatSidenavModule, RouterOutlet,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavContainer, RouterLink, MatBadge],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  public isLoggedIn = false;

  constructor(private readonly keycloak: KeycloakService) { }

  async ngOnInit()  {
    this.isLoggedIn = this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      console.info("user is logged in, token is getting loaded")
      const token = await this.keycloak.getToken();
      sessionStorage.setItem("auth", token);
    } else {
      console.info("User is not logged in, no access token available.")
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout(environment.keycloak.logout_redirectUri);
  }
}
