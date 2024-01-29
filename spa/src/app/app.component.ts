import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatBadge} from "@angular/material/badge";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSidenavModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavContainer, RouterLink, MatBadge],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private readonly keycloak: KeycloakService) { }

  public login() {
    console.info("login please")
    this.keycloak.login();
  }

  public logout() {
    let redirectURI: string = "http://localhost:4200/home";
    this.keycloak.logout(redirectURI);
  }
}
