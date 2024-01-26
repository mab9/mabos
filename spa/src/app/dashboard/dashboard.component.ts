import {Component} from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {AbosStore} from "../service/abos.store";
import {SettingsStore} from "../service/settings.store";
import {Setting} from "../model/settings.model";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatList,
    MatListItem,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public abosStore : AbosStore,
              public settingsStore: SettingsStore) {
  }


  onDisableReminder(item : Setting) {
    item.isReminderEmailActivated = false;
    this.settingsStore.saveItem('mab@mab.rocks', item);


  }

  onActivateReminder(item: Setting) {
    item.isReminderEmailActivated = true;
    this.settingsStore.saveItem('mab@mab.rocks', item);
  }
}
