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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
    MatSidenavModule, RouterOutlet,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavContainer, RouterLink, MatBadge],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }
  ]
})
export class AppComponent implements OnInit {

  constructor(private readonly keycloak: KeycloakService) { }

  ngOnInit(): void {
    console.log("app component init")
  }

  public login() {
    console.info("login please")
    this.keycloak.login();
  }

  public logout() {
    console.info("logout please")
    let redirectURI: string = "http://localhost:4200/home";
    this.keycloak.logout(redirectURI);
  }
}
