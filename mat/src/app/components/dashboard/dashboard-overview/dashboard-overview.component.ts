import { Component } from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {AbosStore} from "../../../stores/abos.store";
import {AuthStore} from "../../../stores/auth.store";
import {User} from "../../../model/user.model";

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatList,
    MatListItem,
    NgIf
  ],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss'
})
export class DashboardOverviewComponent {
  constructor(public abosStore : AbosStore,
              public authStore: AuthStore,
  ) {
  }

  onDisableReminder(item : User) {
    item.sendEmailReminders = false;
    this.authStore.update(item);
  }

  onActivateReminder(item: User) {
    item.sendEmailReminders = true;
    this.authStore.update(item);
  }

}
