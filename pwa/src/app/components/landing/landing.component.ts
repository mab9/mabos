import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCell, MatCellDef, MatColumnDef, MatRow, MatRowDef, MatTable} from "@angular/material/table";
import {ViewPortService} from "../../services/view-port.service";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatIcon,
    MatIconButton,
    MatButton,
    MatTable,
    MatColumnDef,
    MatCell,
    MatRow,
    MatRowDef,
    MatCellDef,
    MatDivider
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  protected currentIndex = 0;
  //protected features = Array.of("never forget","monthly and yearly expense overview","expense grouping", "free and open source")

  constructor(public viewPortService : ViewPortService) {
  }

  dataSource = [
    [
      { row: 'Gather expenses' },
      { row: 'Expenses overview' },
    ],

    [
      { row: 'Expense tagging' },
      { row: 'Chart overview' },
    ]

    // Add more features here
  ];

  scrollToFeatures() {
      document.getElementById('features-container')?.scrollIntoView({behavior: 'smooth'});
  }

  scrollToTop(event : Event) {
    console.info("scroll to top - somehow not working", event)
    document.getElementById('landing-container')?.scrollIntoView({behavior: 'smooth'});
  }

  notImplemented() {
    alert('redirect not implemented for the moment. go to login and register.')
  }

  showCard(index: number): boolean {
    return index === this.currentIndex;
  }

  nextFeature() {
    if (this.currentIndex === this.dataSource.length -1) {
      return;
    } else {
      this.currentIndex += 1;
    }
  }

  previousFeature() {
    if (this.currentIndex === 0) {
      return;
    } else {
      this.currentIndex -= 1;
    }
  }
}
