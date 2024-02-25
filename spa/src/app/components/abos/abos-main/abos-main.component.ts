import { Component } from '@angular/core';
import {DashboardDetailComponent} from "../../dashboard/dashboard-detail/dashboard-detail.component";
import {DashboardMainComponent} from "../../dashboard/dashboard-main/dashboard-main.component";
import {DashboardOverviewComponent} from "../../dashboard/dashboard-overview/dashboard-overview.component";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {AbosListComponent} from "../abos-list/abos-list.component";

@Component({
  selector: 'app-abos',
  standalone: true,
  imports: [
    DashboardDetailComponent,
    DashboardMainComponent,
    DashboardOverviewComponent,
    MatFabButton,
    MatIcon,
    NgIf,
    AbosListComponent
  ],
  templateUrl: './abos-main.component.html',
  styleUrl: './abos-main.component.scss'
})
export class AbosMainComponent {

}
