import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Abo} from "../../model/abos.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-abos-card',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './abos-card.component.html',
  styleUrl: './abos-card.component.scss'
})
export class AbosCardComponent implements OnInit {

  form: FormGroup | undefined;


  @Input({ required: true })
  // @ts-ignore
  public item: Abo;


  constructor(
    private fb: FormBuilder,
  ) {
    console.info("load abos card constructor")
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id:                       [this.item.id],
      title:                    [this.item.title],
      price:                    [this.item.price],
      active:                   [this.item.active],
      description:              [this.item.description],
      startDate:                [this.item.startDate],
      isExpiringThisMonth:      [this.item.isExpiringThisMonth],
      isAutoRenewal:            [this.item.isAutoRenewal],
      expReminder:              [false],
      expReminderPeriod:        [false],
      expReminderPeriodAmounts: [false],
    });

    // Subscribe to form value changes
    this.form.valueChanges.subscribe((formValue) => {
      console.info("on form change", formValue);
      // Emit the form value or any other data structure you deem necessary
    });
  }
}
