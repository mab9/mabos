import { Component } from '@angular/core';
import {Period} from "../../../model/period.enum";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgIf} from "@angular/common";
import {PeriodPipe} from "../../../pipes/period.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {AbosStore} from "../../../stores/abos.store";
import {MatChip, MatChipOption} from "@angular/material/chips";

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
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
    NgIf,
    PeriodPipe,
    ReactiveFormsModule,
    MatChip,
    MatChipOption
  ],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss'
})
export class DashboardDetailComponent {

    protected readonly Period = Period;
    protected readonly Object = Object;

  constructor(
    public abosStore: AbosStore,
  ) {
  }

  getValueCtrl (field : string) {
    return this.abosStore.selectedItemFg?.get(field);
  }
}
