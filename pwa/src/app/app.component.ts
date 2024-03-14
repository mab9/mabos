import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, NgIf, NgOptimizedImage} from '@angular/common';
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
import {MessagesService} from "./services/messages.service";
import {NavigationService} from "./services/navigation.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
    MatSidenavModule, RouterOutlet,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavContainer, RouterLink, MatBadge, MatMenu, MatMenuItem, MatMenuTrigger, AsyncPipe, MatIcon, MatIconButton, NgIf, AsyncPipe, MatIcon, MatIconButton, NgIf, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public authStore: AuthStore,
    private readonly keycloak: KeycloakService,
    public aboStore : AbosStore,
    public naviService : NavigationService,
    private swUpdate : SwUpdate,
    public messageService : MessagesService,
  ) {
    this.somePwaTests()
  }


  public async ngOnInit() {
    if (this.keycloak.isLoggedIn()) {
      this.authStore.loadMe();
    }
  }

  private somePwaTests() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(isUpdateAvailable => {
        if (isUpdateAvailable) {
          const snackBarRef = this.messageService.openSnackBar('New version available', 'Reload', 6);
          snackBarRef.onAction().subscribe(() => {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
          });
        }
        });
    }

    // this is for native api tests. but we don't want to bother the user.
    //navigator.geolocation.getCurrentPosition((result) => {
    //  console.info("geo location", result)
    //})

    window.addEventListener("online",  () => {
      this.messageService.showMessages("You are back online.")
    });

    window.addEventListener("offline",  () => {
      this.messageService.showMessages("Oh no, you went offline!")
    });
  }

  public login() {
    this.authStore.login();
  }

  public logout() {
    this.authStore.logout();
  }

  back() {
    this.aboStore.setSelectedFg(null);
    this.naviService.goHome();
  }
}
