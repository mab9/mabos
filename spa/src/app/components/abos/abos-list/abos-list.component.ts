import { Component } from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
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
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {PeriodPipe} from "../../../pipes/period.pipe";
import {AbosStore} from "../../../stores/abos.store";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {Abo} from "../../../model/abos.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {map, Observable} from "rxjs";
import {AbosStoreV2} from "../../../stores/abosV2.store";


@Component({
  selector: 'app-abos-list',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
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
    PeriodPipe,
    FormsModule,
    MatHeaderCellDef,
    MatFooterCellDef,
    MatFormField,
    MatInput
  ],
  templateUrl: './abos-list.component.html',
  styleUrl: './abos-list.component.scss'
})
export class AbosListComponent {
  /*
    The selected Item should be handled at one place. Since this is the consolidation of
    code into components and refactoring within no time, the ugly solution is fine for now.
   */
  displayedColumns: string[] = ['title', 'price', 'period', 'active', 'remove'];
  protected readonly Breakpoints = Breakpoints;


  filteredAbos$: Observable<Abo[]> | undefined;
  searchKey: string = '';

  constructor(
    public abosStore: AbosStoreV2,
    protected breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
  ) {

    this.updateFilter();

    breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(obsi => {
      if (obsi.matches) {
        this.displayedColumns = ['title', 'active',];
      } else {
        this.displayedColumns = ['title', 'price', 'period', 'active', 'remove'];
      }
    })
  }

  filterAbo(abo: Abo, searchKey: string): boolean {
    // Implement your filtering logic here
    // For example, checking if the abo's name includes the search key:

    // @ts-ignore
    return abo.title.toLowerCase().includes(searchKey.toLowerCase());
  }

  updateFilter(): void {
    this.filteredAbos$ = this.abosStore.abos$.pipe(
      map(abos => abos.filter((abo: Abo) => this.filterAbo(abo, this.searchKey)))
    );
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
