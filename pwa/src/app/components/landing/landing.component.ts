import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(public breakPointObserver : BreakpointObserver) {
  }

  protected readonly BreakpointObserver = BreakpointObserver;
  protected readonly Breakpoints = Breakpoints;
}
