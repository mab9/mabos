import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Abo} from "../model/abos.model";
import {AbosStore} from "../service/abos.store";


@Component({
  selector: 'app-abos',
  standalone: true,
  imports: [],
  templateUrl: './abos.component.html',
  styleUrl: './abos.component.scss'
})
export class AbosComponent implements OnInit {

    // @ts-ignore
    abos$ : Observable<Abo[]>;

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
