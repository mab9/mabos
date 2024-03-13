import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCell, MatCellDef, MatColumnDef, MatRow, MatRowDef, MatTable} from "@angular/material/table";
import {ViewPortService} from "../../services/view-port.service";

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
    MatCellDef
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  protected currentIndex = 0;
  protected features = Array.of("never forget","monthly and yearly expense overview","expense grouping", "free and open source")

  constructor(public viewPortService : ViewPortService) {
  }

  dataSource = [
    { feature: 'Control your subscription expenses' },
    { feature: 'Monthly and yearly costs overview' },
    { feature: 'Plan your expenses' },
    // Add more features here
  ];

  scrollToFeatures() {
      document.getElementById('features-container')?.scrollIntoView({behavior: 'smooth'});
  }

  notImplemented() {
    alert('redirect not implemented for the moment. go to login and register.')
  }

  nextFeature() {
    alert("swipe right")

    if (this.currentIndex === this.features.length) {
      return;
    } else {
      this.currentIndex += 1;
    }
  }

  previousFeature() {
    alert("swipe left")
    if (this.currentIndex === 0) {
      return;
    } else {
      this.currentIndex -= 1;
    }
  }

  click() {
    console.info("click")
  }

  swipe(event : Event) {
    alert("Swipe alert " + event.type)

  }

  swiper() {
    alert("Swiper alert")
  }
}
