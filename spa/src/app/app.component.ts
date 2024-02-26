import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, CommonModule, NgIf} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatBadge} from "@angular/material/badge";
import {KeycloakService} from "keycloak-angular";
import {AuthStore} from "./stores/auth.store";
import {MessagesService} from "./services/messages.service";
import {AbosStore} from "./stores/abos.store";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AbosStoreV2} from "./stores/abosV2.store";

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
    private messageService : MessagesService,
    public aboStore : AbosStoreV2,
    public breakpointObserver: BreakpointObserver,
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

  back() {
    this.aboStore.setSelectedFg(null);
  }

  protected readonly Breakpoints = Breakpoints;
}
