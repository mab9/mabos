import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatBadge} from "@angular/material/badge";
import {KeycloakService} from "keycloak-angular";
import {AuthStore} from "./stores/auth.store";

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

  constructor(
    public authStore: AuthStore,
    private readonly keycloak: KeycloakService
  ) {
  }

  // this mess is only needed until keycloak is self handling auth header appending
  public async ngOnInit() {
    if (this.keycloak.isLoggedIn()) {
      const token = await this.keycloak.getToken();
      console.info("töken was loaded", token)
      sessionStorage.setItem("AUTH_ACCESS_TOKEN", token);
      this.authStore.loadMe();
    }
  }

  public login() {
    this.authStore.login();
  }

  public logout() {
    this.authStore.logout();
  }
}
