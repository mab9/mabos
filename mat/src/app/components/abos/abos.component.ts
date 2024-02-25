import {Component} from '@angular/core';
import {Abo} from "../../model/abos.model";
import {AbosStore} from "../../stores/abos.store";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatChip, MatChipOption} from "@angular/material/chips";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";


@Component({
  selector: 'app-abos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule,
    AsyncPipe, NgIf, MatCheckbox, MatFormField, MatSelectModule, MatFormFieldModule, MatInputModule,
    MatSelect, MatOption, MatChipOption, MatChip, MatSort, MatSortHeader, FormsModule, CurrencyPipe, MatSlideToggle],
  templateUrl: './abos.component.html',
  styleUrl: './abos.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AbosComponent {

    displayedColumns: string[] = ['title', 'price', 'period', 'active', 'actions'];

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

  onEdit(element: Abo) {
    element.isEditing = true;
  }

  onSave(item: Abo) {
    item.isEditing = false;
    this.abosStore.saveItem(item.id!, item)
  }

  onRemove(element : Abo) {
    this.abosStore.removeItem(element.id!);
  }

  protected readonly Object = Object;
}
