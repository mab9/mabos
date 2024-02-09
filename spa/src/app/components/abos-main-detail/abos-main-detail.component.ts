import {Component} from '@angular/core';
import {AbosStore} from "../../stores/abos.store";
import {Abo} from "../../model/abos.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
    MatSuffix
  ],
  templateUrl: './abos-main-detail.component.html',
  styleUrl: './abos-main-detail.component.scss'
})
export class AbosMainDetailComponent {

  selectedItemFg: FormGroup;
  displayedColumns: string[] = ['title', 'price', 'period', 'active', 'remove'];

  constructor(
    public abosStore: AbosStore,
    private fb: FormBuilder,
  ) {
    this.selectedItemFg = this.fb.group({
      id: '',
      title: '',
      price: '',
      period: '',
      active: '',
      description: '',
      isAutoRenewal: '',
      startDate: '',
      expReminder: '',
      expReminderPeriod: '',
      expReminderPeriodAmounts: '',
    });
  }

  trackById(index: number, item: Abo): number | null {
    return item.id;
  }

  getValueCtrl (field : string) {
    return this.selectedItemFg.get(field);
  }

  onSelectItem(abo: Abo) {

    // todo  update ID of abo, when abo was created
    // raise snackbar on network error

    this.selectedItemFg = this.newAbo(abo);

    this.selectedItemFg.get('active')?.valueChanges.subscribe((value : boolean) => {
      if (value) {
        this.getValueCtrl('expReminderPeriod')?.enable()
        this.getValueCtrl('expReminderPeriodAmounts')?.enable()
      } else {
        this.getValueCtrl('expReminderPeriod')?.disable()
        this.getValueCtrl('expReminderPeriodAmounts')?.disable()
      }
    })
    this.selectedItemFg.valueChanges.subscribe((value : Abo) => {
      console.info("values have changed, time to persist", value)
      this.abosStore.saveItem(value.id!, value)
    })
  }

  onAdd() {
    const newAbo = this.abosStore.createItem();
    this.onSelectItem(newAbo);
  }

  onRemove(element: Abo) {
    this.abosStore.removeItem(element.id!);
    // todo set next selected item if one was selected.
  }

  onModelChange(item: Abo) {
    this.abosStore.saveItemDebounce(item.id!, item);
  }


  private newAbo(abo: Abo): FormGroup {
    return this.fb.group({
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
  }


  protected readonly Period = Period;
  protected readonly Object = Object;
}
