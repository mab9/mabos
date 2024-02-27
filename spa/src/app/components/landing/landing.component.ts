import {AfterViewInit, Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

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
export class LandingComponent implements AfterViewInit {

  isSpinning = false;
  text: string[] = [];
  triggerStartTextAnimation = false;

  constructor() {
    this.startSpin();
    const phrase = "Start tracking your abo expenses now!";
    this.text = phrase.split(' ');
    // Start the text animation just before the logo animation finishes
    setTimeout(() => {
      this.startTextAnimation(); // This could simply set a flag to start the animation
    }, 1500); // Adjust the time as needed
  }

  ngAfterViewInit(): void {

  }

  startTextAnimation() {
    this.triggerStartTextAnimation = false; // reset in case of animation shall run again.
    this.triggerStartTextAnimation = true;
  }

  startSpin() {
    this.isSpinning = false; // reset in case of animation shall run again.
    this.isSpinning = true;
  }
}
