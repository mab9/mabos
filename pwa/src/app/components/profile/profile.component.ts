import {Component} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {MatMenuItem} from "@angular/material/menu";
import {AuthStore} from "../../stores/auth.store";
import {Period} from "../../model/period.enum";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {PeriodPipe} from "../../pipes/period.pipe";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {NavigationService} from "../../services/navigation.service";
import {MessagesService} from "../../services/messages.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {FeatureFlagsStore} from "../../stores/feature-flags.store";
import {FeatureFlag} from "../../model/feature-flag.model";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    MatMenuItem,
    NgIf,
    DatePipe,
    DecimalPipe,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatChip,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSlideToggle,
    MatSuffix,
    PeriodPipe,
    ReactiveFormsModule,
    MatTooltip,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFooterCell,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  protected readonly Period = Period;
  protected readonly Object = Object;
  displayedColumns: string[] = ['feature', 'flag'];

  constructor(
    public dialog: MatDialog,
    private naviService : NavigationService,
    private messageService: MessagesService,
    public featureFlagStore : FeatureFlagsStore,
    public authStore : AuthStore) {

    this.naviService.setNaviDataDetailPage('My profile');
  }

  trackByFeature(index: number, item: FeatureFlag): string | null {
    return item.feature;
  }

  onChangeItem(item : FeatureFlag) {
    this.featureFlagStore.save(item);
  }

  public removeMe() {
    const dialogSubscription = this.dialog.open(DialogComponent, {
      width: '100%',
      enterAnimationDuration : '250ms',
      exitAnimationDuration : '250ms',
    });

    dialogSubscription.afterClosed().subscribe(decision => {
      if (decision === 'delete') {
        // todo this will delete the profile in the futur and redirect to landing page.
        this.messageService.showMessages("Function not implemented at the moment.")
        this.naviService.goHome()
      }
    })
  }
}
