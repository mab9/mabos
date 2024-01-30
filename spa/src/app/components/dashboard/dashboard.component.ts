import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {AbosStore} from "../../stores/abos.store";
import {SettingsStore} from "../../stores/settings.store";
import {Setting} from "../../model/settings.model";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatChip, MatChipOption} from "@angular/material/chips";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Abo} from "../../model/abos.model";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";

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
    NgIf,
    FormsModule,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatChip,
    MatColumnDef,
    MatFooterCell,
    MatFooterRow,
    MatFooterRowDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    MatTableModule, MatButtonModule, MatIconModule, AsyncPipe, NgIf, MatCheckbox, MatFormField, MatSelectModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatChipOption, MatChip, MatSort, MatSortHeader, FormsModule, CurrencyPipe, MatSlideToggle,

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['title', 'price', 'period', 'active'];

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(public abosStore : AbosStore,
              public settingsStore: SettingsStore,
              private readonly keycloak: KeycloakService) {
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      // this.user.authStatus = 'AUTH';
      // this.user.name = this.userProfile.firstName || "";
      //  window.sessionStorage.setItem("userdetails",JSON.stringify(this.user));
    }
  }


  onDisableReminder(item : Setting) {
    item.isReminderEmailActivated = false;
    this.settingsStore.saveItem('mab@mab.rocks', item);


  }

  onActivateReminder(item: Setting) {
    item.isReminderEmailActivated = true;
    this.settingsStore.saveItem('mab@mab.rocks', item);
  }

  trackById(index: number, item: Abo): any {
    return item.id;
  }
}
