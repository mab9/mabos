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
import {AbosDetailComponent} from "../abos-detail/abos-detail.component";
import {AbosOverviewComponent} from "../abos-overview/abos-overview.component";

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
    AsyncPipe,
    AbosDetailComponent,
    AbosOverviewComponent
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
      costsPerYear: 0,

      expReminder: abo.expReminder,
      expReminderPeriod: abo.expReminderPeriod,
      expReminderPeriodAmounts: abo.expReminderPeriodAmounts,
    })
    return this.onChangeValueUpdateBehaveiour(formGroup);
  }

  private onChangeValueUpdateBehaveiour(formGroup : FormGroup) {
    formGroup.get('expReminder')?.valueChanges.subscribe((value : boolean) => {
      this.setActiveness(value, 'expReminderPeriod', formGroup)
      this.setActiveness(value, 'expReminderPeriodAmounts', formGroup)
    })

    formGroup.get('isAutoRenewal')?.valueChanges.subscribe((value : boolean) => {
      this.setActiveness(value, 'startDate', formGroup)
    })

    formGroup.get('price')?.valueChanges.subscribe(price => {
      this.updateAboCostsPerYear()
    })

    formGroup.get('period')?.valueChanges.subscribe(_ => {
      this.updateAboCostsPerYear()
    })

    // init at least!
    const expReminderValue = formGroup.get('expReminder')?.value;
    const isAutoRenewalValue = formGroup.get('isAutoRenewal')?.value;

    this.setActiveness(expReminderValue, 'expReminderPeriod', formGroup)
    this.setActiveness(expReminderValue, 'expReminderPeriodAmounts', formGroup)
    this.setActiveness(isAutoRenewalValue, 'startDate', formGroup)

    this.updateAboCostsPerYear();

    formGroup.valueChanges.subscribe((item : Abo) => {
      this.abosStore.saveItemDebounce(item.id!, item);
    })
    return formGroup;
  }

  private updateAboCostsPerYear() {
    const formGroup = this.abosStore.selectedItemFg!;
    if (formGroup == null) {
      return;
    }
    const abo : Abo = { ...formGroup.getRawValue(), isEditing: false };
    const price = abo.price > 0 ? this.abosStore.calcAboPricePerYear(abo) : 0;
    formGroup.get('costsPerYear')!.setValue(price);
  }

  private setActiveness(isActive: boolean, attribute : string, formGroup : FormGroup) {
    if (isActive) {
      formGroup.get(attribute)?.enable()
    } else {
      formGroup.get(attribute)?.disable()
    }
  }
}
