import {Component} from '@angular/core';
import {AbosStore} from "../../stores/abos.store";
import {Abo} from "../../model/abos.model";
import {Period} from '../../model/period.enum';
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {
  MatDatepicker,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatChip, MatChipOption} from "@angular/material/chips";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

@Component({
  selector: 'app-abos-reactive',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, AsyncPipe, NgIf, MatCheckbox, MatFormField, MatSelectModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatChipOption, MatChip, MatSort, MatSortHeader, FormsModule, CurrencyPipe, MatSlideToggle, MatDatepickerToggle, MatDatepicker, MatDatepickerActions, MatDatepickerInput, MatDatepickerApply, MatDatepickerCancel, MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardContent],
  templateUrl: './abos-reactive.component.html',
  styleUrl: './abos-reactive.component.scss'
})
export class AbosReactiveComponent {

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
    this.abosStore.saveItemDebounce(item.id!, item);
  }
}
