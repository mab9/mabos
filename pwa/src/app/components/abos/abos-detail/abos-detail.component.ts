import {Component} from '@angular/core';
import {Period} from "../../../model/period.enum";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {AsyncPipe, CurrencyPipe, DecimalPipe, JsonPipe, NgIf} from "@angular/common";
import {PeriodPipe} from "../../../pipes/period.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {AbosStore} from "../../../stores/abos.store";
import {MatChip, MatChipOption} from "@angular/material/chips";
import {MatButton} from "@angular/material/button";
import {NavigationService} from "../../../services/navigation.service";
import {TagsEnum} from "../../../model/tags.enum";
import {TagPipe} from "../../../pipes/tag.pipe";

@Component({
  selector: 'app-abos-detail',
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
    MatChipOption,
    MatButton,
    AsyncPipe,
    JsonPipe,
    CurrencyPipe,
    DecimalPipe,
    TagPipe
  ],
  templateUrl: './abos-detail.component.html',
  styleUrl: './abos-detail.component.scss'
})
export class AbosDetailComponent {

    protected readonly Period = Period;
    protected readonly Object = Object;

  constructor(
    public abosStore: AbosStore,
    private naviService : NavigationService,
  ) {
    this.naviService.setNaviDataDetailPage('Subscription details')
  }

  isTrue (field : string) {
    return this.abosStore.selectedItemFg!.get(field)?.value
  }

  removeMe() {
    const id = this.abosStore.selectedItemFg?.get('id')?.value;
    this.abosStore.removeItem(id)
    this.naviService.goHome();
  }

  protected readonly TagsEnum = TagsEnum;
}
