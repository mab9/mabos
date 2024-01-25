import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Abo} from "../model/abos.model";
import {AbosStore} from "../service/abos.store";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";


@Component({
  selector: 'app-abos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, AsyncPipe, NgIf, MatCheckbox],
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
    displayedColumns: string[] = ['title', 'price', 'period', 'active'];

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

}
