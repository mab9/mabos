import {Component, EventEmitter, Output} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, CurrencyPipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
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
import {PeriodPipe} from "../../../pipes/period.pipe";
import {FormBuilder, FormsModule} from "@angular/forms";
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
    MatInput,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './abos-list.component.html',
  styleUrl: './abos-list.component.scss'
})
export class AbosListComponent {


  @Output('onSelectItem')
  private onSelectItemEvent = new EventEmitter<Abo>;

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
    // Implement filtering logic here
    // For example, checking if the abo's name includes the search key:

    // @ts-ignore
    return abo.title.toLowerCase().includes(searchKey.toLowerCase());
  }

  updateFilter(): void {
    this.filteredAbos$ = this.abosStore.abos$.pipe(
      map(abos => abos
        .filter((abo: Abo) => this.filterAbo(abo, this.searchKey))
        .sort((a, b) => a.title.localeCompare(b.title)))
    );
  }

  trackById(index: number, item: Abo): number | null {
    return item.id;
  }

  onRemove(element: Abo) {
    this.abosStore.removeItem(element.id!);
  }

  onSelectItem(abo: Abo) {
    this.onSelectItemEvent.emit(abo);
  }

  onChangeItem(item : Abo) {
    this.abosStore.saveItemDebounce(item.id!, item);
  }
}
