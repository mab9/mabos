import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCell, MatCellDef, MatColumnDef, MatRow, MatRowDef, MatTable} from "@angular/material/table";

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

  constructor(public breakPointObserver : BreakpointObserver) {
  }

  protected readonly BreakpointObserver = BreakpointObserver;
  protected readonly Breakpoints = Breakpoints;

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
}
