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
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

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
    MatButton
  ],
  templateUrl: './abos-main-detail.component.html',
  styleUrl: './abos-main-detail.component.scss'
})
export class AbosMainDetailComponent {

  selectedItemFg: FormGroup;
  displayedColumns: string[] = ['title', 'price', 'period', 'active'];

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
    });
  }

  trackById(index: number, item: Abo): number | null {
    return item.id;
  }


  onSelectItem(abo: Abo) {
    console.info("set value", abo)
    this.selectedItemFg = this.newAbo(abo);
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
    })
  }


}
