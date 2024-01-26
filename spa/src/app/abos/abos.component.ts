import {Component, OnInit, TrackByFunction} from '@angular/core';
import {Observable} from "rxjs";
import {Abo} from "../model/abos.model";
import {AbosStore} from "../service/abos.store";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {Period} from "../model/period.enum";
import {MatChip, MatChipOption} from "@angular/material/chips";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-abos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, AsyncPipe, NgIf, MatCheckbox, MatFormField, MatSelectModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatChipOption, MatChip, MatSort, MatSortHeader, FormsModule, CurrencyPipe],
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
export class AbosComponent implements OnInit {

    // @ts-ignore
    abos$ : Observable<Abo[]>;
    displayedColumns: string[] = ['title', 'price', 'period', 'active', 'actions'];

    constructor(
      private abosStore : AbosStore
    ) {
    }

  ngOnInit() {
    this.reloadAbos();
  }

  reloadAbos() {
    this.abos$ = this.abosStore.abos$;
  }

  trackById(index: number, item: Abo): any {
    return item.id;
  }

  onAdd() {
      const abo : Abo = {
        id: '20',
        title: 'new abo',
        price: 20,
        period : Period.YEAR,
        active: true,
        description: 'expensive new abo',
        isEditing : false,
      }
      this.abosStore.addData(abo);
  }

  edit(element: Abo) {
    element.isEditing = true;
  }

  save(element: Abo) {
    element.isEditing = false;

    // Implement saving logic here, e.g., update the dataSource or send changes to the backend
  }
  getTotalCost() {
    return this.abosStore.getTotalCostOfAbos();
  }

  getTotalActiveAbos() {
      return this.abosStore.getTotalActiveAbos();
  }

  remove(element : Abo) {
    this.abosStore.removeData(element);
  }

  protected readonly Period = Period;
}
