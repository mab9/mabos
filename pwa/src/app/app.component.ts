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
import {SwUpdate} from "@angular/service-worker";

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

    private updates: SwUpdate,
    private readonly keycloak: KeycloakService,
    public aboStore : AbosStore,
  ) {

    this.updates.versionUpdates.subscribe(evt => {
      console.info("version update", evt)
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });

    // Remember to always include checks for feature availability ('setAppBadge' in navigator)
    // before attempting to use it, to ensure your application doesn't throw errors on browsers
    // that don't support the Badging API.
    if ('setAppBadge' in navigator) {
      navigator.setAppBadge(1)
        .then(() => console.log('Badge set!'))
        .catch((error) => console.error('Error setting badge:', error));
    }

    // clear navigator.clearAppBadge();

    Notification.requestPermission().then(result => {
      console.info("requested permissions - answer. This is needed for push notifications ", result)
    });

    self.addEventListener( "activate", function( event ){
      console.log( "WORKER: activation event in progress." );
      navigator.geolocation.getCurrentPosition((result) => console.info("geo location", result))
      //console.log( "WORKER: all clients are now controlled by me! Mwahahaha!" );
    });

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
