import {Component} from '@angular/core';
import {AbosStore} from "../../stores/abos.store";
import {Abo} from "../../model/abos.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, CurrencyPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatChip} from "@angular/material/chips";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {Period} from "../../model/period.enum";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {PeriodPipe} from "../../pipes/period.pipe";
import {DashboardDetailComponent} from "../dashboard-detail/dashboard-detail.component";
import {DashboardMainComponent} from "../dashboard-main/dashboard-main.component";

@Component({
  selector: 'app-abos-main-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    CurrencyPipe,
    MatCell,
    MatCellDef,
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
    MatSlideToggle,
    MatSort,
    MatSortHeader,
    MatTable,
    MatLabel,
    MatHint,
    MatHeaderCellDef,
    MatFooterCellDef,
    MatFabButton,
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    JsonPipe,
    MatCardActions,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    FormsModule,
    PeriodPipe,
    DashboardDetailComponent,
    DashboardMainComponent
  ],
  templateUrl: './abos-main-detail.component.html',
  styleUrl: './abos-main-detail.component.scss'
})
export class AbosMainDetailComponent {

  selectedItemFg: FormGroup | null = null;
  displayedColumns: string[] = ['title', 'price', 'period', 'active', 'remove'];

  constructor(
    public abosStore: AbosStore,
    private fb: FormBuilder,
  ) {
  }

  trackById(index: number, item: Abo): number | null {
    return item.id;
  }

  getValueCtrl (field : string) {
    return this.selectedItemFg?.get(field);
  }

  onSelectItem(abo: Abo) {
    // todo  update ID of abo, when abo was created
    console.info("update selected item", abo)
    this.selectedItemFg = this.newAbo(abo);
  }

  // this is very ugly and only used temp. until I figured out the better master detail data sync handling with angular.
  onChangeItem(item : Abo) {
    this.abosStore.saveItemDebounce(item.id!, item);
    this.onSelectItem(item);
  }

  onAdd() {
    const newAbo = this.abosStore.createItem();
    this.onSelectItem(newAbo);
  }

  onRemove(element: Abo) {
    this.abosStore.removeItem(element.id!);
    this.selectedItemFg = null;
  }

  private newAbo(abo: Abo): FormGroup {
    const formGroup =  this.fb.group({
      id: abo.id ? abo.id : '',
      title: [abo.title, Validators.required],
      price: abo.price,
      period: abo.period,
      active: abo.active,
      description: abo.description,
      isAutoRenewal: abo.isAutoRenewal,
      startDate: abo.startDate,

      expReminder: abo.expReminder,
      expReminderPeriod: abo.expReminderPeriod,
      expReminderPeriodAmounts: abo.expReminderPeriodAmounts,
    })
    return this.onChangeValueUpdateBehaveiour(formGroup);

  }

  private onChangeValueUpdateBehaveiour(formGroup : FormGroup) {
    formGroup.get('expReminder')?.valueChanges.subscribe((value : boolean) => {
      this.updateExpReminderActiveness(value, formGroup);
    })

    this.updateExpReminderActiveness(formGroup.get('expReminder')?.value, formGroup);
    formGroup.valueChanges.subscribe((item : Abo) => {
      console.info("values have changed, time to persist", item)
      this.abosStore.saveItemDebounce(item.id!, item);
    })

    // init connected fields.
    return formGroup;
  }

  private updateExpReminderActiveness(isActive : boolean, formGroup : FormGroup) {
    if (isActive) {
      formGroup.get('expReminderPeriod')?.enable()
      formGroup.get('expReminderPeriodAmounts')?.enable()
    } else {
      formGroup.get('expReminderPeriod')?.disable()
      formGroup.get('expReminderPeriodAmounts')?.disable()
    }
  }


  protected readonly Period = Period;
  protected readonly Object = Object;
}
