import { Component } from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell, MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatChip} from "@angular/material/chips";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {PeriodPipe} from "../../pipes/period.pipe";
import {AbosStore} from "../../stores/abos.store";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {Abo} from "../../model/abos.model";

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    MatCell,
    MatCellDef,
    MatChip,
    MatColumnDef,
    MatFabButton,
    MatFooterCell,
    MatFooterRow,
    MatFooterRowDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRow,
    MatRowDef,
    MatSlideToggle,
    MatSort,
    MatSortHeader,
    MatTable,
    NgIf,
    PeriodPipe,
    FormsModule,
    MatFooterCellDef,
    MatHeaderCellDef
  ],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.scss'
})
export class DashboardMainComponent {
  displayedColumns: string[] = ['title', 'price', 'period', 'active', 'remove'];

  constructor(
    public abosStore: AbosStore,
    private fb: FormBuilder,
  ) {
  }

  trackById(index: number, item: Abo): number | null {
    return item.id;
  }

  onAdd() {
    const newAbo = this.abosStore.createItem();
    this.onSelectItem(newAbo);
  }

  onRemove(element: Abo) {
    this.abosStore.removeItem(element.id!);

  }

  onSelectItem(abo: Abo) {
    // todo  update ID of abo, when abo was created
    console.info("update selected item", abo)
    this.abosStore.setSelectedFg(this.newAbo(abo));
  }

  // this is very ugly and only used temp. until I figured out the better master detail data sync handling with angular.
  onChangeItem(item : Abo) {
    this.abosStore.saveItemDebounce(item.id!, item);
    this.onSelectItem(item);
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


}
