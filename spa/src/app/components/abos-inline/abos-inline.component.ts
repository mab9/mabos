import { Component } from '@angular/core';
import {Abo} from "../../model/abos.model";
import {AbosStore} from "../../stores/abos.store";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatChip, MatChipOption} from "@angular/material/chips";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import {Period} from "../../model/period.enum";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  MatDatepicker,
  MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";


@Component({
  selector: 'app-abos-inline',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, AsyncPipe, NgIf, MatCheckbox, MatFormField, MatSelectModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatChipOption, MatChip, MatSort, MatSortHeader, FormsModule, CurrencyPipe, MatSlideToggle, MatDatepickerToggle, MatDatepicker, MatDatepickerActions, MatDatepickerInput, MatDatepickerApply, MatDatepickerCancel],
  templateUrl: './abos-inline.component.html',
  styleUrl: './abos-inline.component.scss'
})
export class AbosInlineComponent {

  protected readonly Object = Object;
  protected readonly Period = Period;
  displayedColumns: string[] = ['title', 'price', 'period','starteDate', 'active', 'actions'];

  constructor(
    public abosStore : AbosStore
  ) {
  }

  trackById(index: number, item: Abo): number | null {
    return item.id;
  }

  onAdd() {
    this.abosStore.createItem();
  }
  onRemove(element : Abo) {
    this.abosStore.removeItem(element.id!);
  }

  onModelChange(item: Abo) {
    this.abosStore.saveItem(item.id!, item);
  }
}
