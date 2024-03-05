import { Component } from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {MatMenuItem} from "@angular/material/menu";
import {AuthStore} from "../../stores/auth.store";
import {Period} from "../../model/period.enum";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatChip} from "@angular/material/chips";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {PeriodPipe} from "../../pipes/period.pipe";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    MatMenuItem,
    NgIf,
    DatePipe,
    DecimalPipe,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatChip,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSlideToggle,
    MatSuffix,
    PeriodPipe,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(public authStore : AuthStore) {
  }


  protected readonly Period = Period;
  protected readonly Object = Object;
}
