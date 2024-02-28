import {AfterContentInit, AfterViewInit, Component} from '@angular/core';
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
export class LandingComponent implements AfterContentInit {

  isSpinning = false;
  text: string[] = [];
  triggerStartTextAnimation = false;

  constructor(public breakPointObserver : BreakpointObserver) {
  }

  ngAfterContentInit(): void {
    this.startSpin();
    const phrase = "Start tracking your subscription expenses now!";
    this.text = phrase.split(' ');
    // Start the text animation just before the logo animation finishes
    setTimeout(() => {
      this.startTextAnimation(); // This could simply set a flag to start the animation
    }, 1500); // Adjust the time as needed
  }

  startTextAnimation() {
    this.triggerStartTextAnimation = false; // reset in case of animation shall run again.
    this.triggerStartTextAnimation = true;
  }

  startSpin() {
    this.isSpinning = false; // reset in case of animation shall run again.
    this.isSpinning = true;
  }

  protected readonly BreakpointObserver = BreakpointObserver;
  protected readonly Breakpoints = Breakpoints;
}
