import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {AbosStore} from "../service/abos.store";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatList,
    MatListItem,
    MatIcon,
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  constructor(public abosStore : AbosStore) {
  }

}
