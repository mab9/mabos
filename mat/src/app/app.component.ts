import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatBadge} from "@angular/material/badge";
import {KeycloakService} from "keycloak-angular";
import {AuthStore} from "./stores/auth.store";
import {MessagesService} from "./services/messages.service";
import {AbosStore} from "./stores/abos.store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
    MatSidenavModule, RouterOutlet,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavContainer, RouterLink, MatBadge, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  constructor(
    public authStore: AuthStore,
    private readonly keycloak: KeycloakService,
    private messageService : MessagesService,
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

  raiseMessage() {
    this.messageService.showMessages("This function is not implemented at the moment");
  }
}
