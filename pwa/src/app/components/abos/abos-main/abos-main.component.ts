import {Component} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgIf} from "@angular/common";
import {AbosListComponent} from "../abos-list/abos-list.component";
import {AbosStore} from "../../../stores/abos.store";
import {Abo} from "../../../model/abos.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AbosDetailComponent} from "../abos-detail/abos-detail.component";
import {AbosOverviewComponent} from "../abos-overview/abos-overview.component";
import {NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-abos',
  standalone: true,
  imports: [
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
    private naviService : NavigationService,
    public abosStore : AbosStore,) {
  }

  onAdd() {
    // quick fix solution to keep track for item ids.
    // because of routing, view and data handling concept changed when moving from from desktop to mobile view,
    this.abosStore.createItem().subscribe(abo => {
      // todo remove me - quick fix for demo case
      this.abosStore.addToAbos(abo);
      this.onSelectItem(abo)
    });
  }

  onSelectItem(abo: Abo) {
    this.abosStore.setSelectedFg(this.newAbo(abo));
    this.naviService.goTo('/abos/' + abo.id)
  }

  private newAbo(abo: Abo): FormGroup {
    const formGroup =  this.fb.group({
      id: abo.id ? abo.id : '',
      title: [abo.title, Validators.required],
      price: abo.price,
      period: abo.period,
      active: abo.active,
      tag: abo.tag,
      description: abo.description,
      isAutoRenewal: abo.isAutoRenewal,
      startDate: abo.startDate,
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

    formGroup.get('price')?.valueChanges.subscribe(() => {
      this.updateAboCostsPerYear()
    })

    formGroup.get('period')?.valueChanges.subscribe(() => {
      this.updateAboCostsPerYear()
    })

    // init at least!
    const expReminderValue = formGroup.get('expReminder')?.value;
    const isAutoRenewalValue = formGroup.get('isAutoRenewal')?.value;

    this.setActiveness(expReminderValue, 'expReminderPeriod', formGroup)
    this.setActiveness(expReminderValue, 'expReminderPeriodAmounts', formGroup)
    this.setActiveness(isAutoRenewalValue, 'startDate', formGroup)

    this.updateAboCostsPerYear(formGroup);

    formGroup.valueChanges.subscribe((item : Abo) => {
      this.abosStore.saveItemDebounce(item.id!, item);
    })
    return formGroup;
  }

  private updateAboCostsPerYear(hacky: FormGroup | null = null) {
    let formGroup = this.abosStore.selectedItemFg!;
    if (formGroup == null && hacky != null) {
      formGroup = hacky;
    }
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
