import { Component } from '@angular/core';
import {DashboardDetailComponent} from "../../dashboard/dashboard-detail/dashboard-detail.component";
import {DashboardMainComponent} from "../../dashboard/dashboard-main/dashboard-main.component";
import {DashboardOverviewComponent} from "../../dashboard/dashboard-overview/dashboard-overview.component";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgIf} from "@angular/common";
import {AbosListComponent} from "../abos-list/abos-list.component";
import {AbosStoreV2} from "../../../stores/abosV2.store";
import {Abo} from "../../../model/abos.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-abos',
  standalone: true,
  imports: [
    DashboardDetailComponent,
    DashboardMainComponent,
    DashboardOverviewComponent,
    MatFabButton,
    MatIcon,
    NgIf,
    AbosListComponent,
    AsyncPipe
  ],
  templateUrl: './abos-main.component.html',
  styleUrl: './abos-main.component.scss'
})
export class AbosMainComponent {

  constructor(
    private fb: FormBuilder,
    public abosStore : AbosStoreV2,) {
  }

  onAdd() {
    const newAbo = this.abosStore.createItem();
    this.onSelectItem(newAbo);
  }

  onSelectItem(abo: Abo) {
    // todo  update ID of abo, when abo was created
    console.info("update selected item", abo)
    this.abosStore.setSelectedFg(this.newAbo(abo));
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
      isExpiringThisMonth : abo.isExpiringThisMonth,

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
