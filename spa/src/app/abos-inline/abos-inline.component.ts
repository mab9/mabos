import { Component } from '@angular/core';
import {debounceTime, Observable, shareReplay} from "rxjs";
import {Abo} from "../model/abos.model";
import {AbosStore} from "../service/abos.store";
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
import {Period} from "../model/period.enum";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {it} from "node:test";


@Component({
  selector: 'app-abos-inline',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, AsyncPipe, NgIf, MatCheckbox, MatFormField, MatSelectModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatChipOption, MatChip, MatSort, MatSortHeader, FormsModule, CurrencyPipe, MatSlideToggle],
  templateUrl: './abos-inline.component.html',
  styleUrl: './abos-inline.component.scss'
})
export class AbosInlineComponent {

  protected readonly Object = Object;
  protected readonly Period = Period;
  displayedColumns: string[] = ['title', 'price', 'period', 'active', 'actions'];

  constructor(
    public abosStore : AbosStore
  ) {
  }

  trackById(index: number, item: Abo): any {
    return item.id;
  }

  onAdd() {
    const item : Abo = {
      id: null,
      title: 'New Abo',
      price: 0,
      period : Period.MONTH,
      active: false,
      description: '',
      isEditing : false,
    }
    this.abosStore.createItem(item).subscribe();
  }
  onRemove(element : Abo) {
    this.abosStore.removeItem(element.id!).subscribe();
  }

  onModelChange(item: Abo) {
    console.info("toggled", item.active)
    this.abosStore.saveItem(item.id!, item).subscribe();
  }
}
