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
    this.somePwaTests()
  }


  public async ngOnInit() {
    if (this.keycloak.isLoggedIn()) {
      this.authStore.loadMe();
    }
  }

  private somePwaTests() {
    this.updates.versionUpdates.subscribe(evt => {
      alert("version update " + evt)
      console.info("version update", evt)
      switch (evt.type) {
        case 'VERSION_DETECTED':
          alert(`Downloading new app version: ${evt.version.hash}`);
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          alert(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          alert(`New app version ready for use: ${evt.latestVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          alert(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });

    // Remember to always include checks for feature availability ('setAppBadge' in navigator)
    // before attempting to use it, to ensure your application doesn't throw errors on browsers
    // that don't support the Badging API.
    if ('setAppBadge' in navigator) {
      navigator.setAppBadge(1)
        .then(() => alert('Badge set!'))
        .catch((error) => alert('Error setting badge: ' + error));
    }

    window.addEventListener("online",  function(){
      console.log("You are online!");
      // @ts-ignore
      navigator.serviceWorker.controller.postMessage({
        type: `IS_ONLINE`
        // add more properties if needed
      });
    });
    window.addEventListener("offline", function(){
      console.log("Oh no, you lost your network connection.");

      // @ts-ignore
      navigator.serviceWorker.controller.postMessage({
        type: `IS_OFFLINE`
        // add more properties if needed
      });
    });

    // clear navigator.clearAppBadge();

    Notification.requestPermission().then(result => {
      console.info("requested permissions - answer. This is needed for push notifications ", result)
    });



    navigator.geolocation.getCurrentPosition((result) => {
      console.info("geo location", result)
    })

    // @ts-ignore
    navigator.serviceWorker.controller.addEventListener('message ',(event) => {
      console.info("test service worker message", event)
    });

    self.addEventListener('message', (event) => {
      console.info("service worker message", event)
      if (event.data && event.data.type === 'IS_OFFLINE') {
        // take relevant actions
        console.info("service worker detected that he is offline")
      }
      if (event.data && event.data.type === 'IS_ONLINE') {
        // take relevant actions
        console.info("service worker detected that he is online")

      }
    });

    function isPushSupported() {
      //checks if user has granted permission to Push notifications
      if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
      }

      //Checks if current browser supports Push notification
      if (!('PushManager' in window)) {
        alert('Sorry, Push notification isn\'t supported in your browser.');
        return;
      }

      //Get `push notification` subscription id

      //If `serviceWorker` is registered and ready
      navigator.serviceWorker.ready
        .then(function (registration) {
          registration.pushManager.getSubscription()
            .catch(function (error) {
              alert('Error occurred while enabling push ' +  error);
              console.error('Error occurred while enabling push ', error);
            });
        });


    }

     isPushSupported();
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
