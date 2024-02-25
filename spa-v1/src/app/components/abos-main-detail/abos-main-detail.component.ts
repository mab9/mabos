import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardDetailComponent} from "../dashboard/dashboard-detail/dashboard-detail.component";
import {DashboardMainComponent} from "../dashboard/dashboard-main/dashboard-main.component";

@Component({
  selector: 'app-abos-main-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DashboardDetailComponent,
    DashboardMainComponent
  ],
  templateUrl: './abos-main-detail.component.html',
  styleUrl: './abos-main-detail.component.scss'
})
export class AbosMainDetailComponent {
}
