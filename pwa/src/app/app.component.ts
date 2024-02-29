import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, NgIf} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatBadge} from "@angular/material/badge";
import {KeycloakService} from "keycloak-angular";
import {AuthStore} from "./stores/auth.store";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AbosStore} from "./stores/abos.store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
    MatSidenavModule, RouterOutlet,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavContainer, RouterLink, MatBadge, MatMenu, MatMenuItem, MatMenuTrigger, AsyncPipe, MatIcon, MatIconButton, NgIf, AsyncPipe, MatIcon, MatIconButton, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public authStore: AuthStore,
    private readonly keycloak: KeycloakService,
    public aboStore : AbosStore,
  ) {

  }
  public async ngOnInit() {
    if (this.keycloak.isLoggedIn()) {
      this.authStore.loadMe();
    }
  }

  public login() {
    this.authStore.login();
  }

  public logout() {
    this.authStore.logout();
  }

  back() {
    this.aboStore.setSelectedFg(null);
  }
}
