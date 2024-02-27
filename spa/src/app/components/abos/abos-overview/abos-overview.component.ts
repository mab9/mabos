import {Component} from '@angular/core';
import {DashboardDetailComponent} from "../../dashboard/dashboard-detail/dashboard-detail.component";
import {DashboardMainComponent} from "../../dashboard/dashboard-main/dashboard-main.component";
import {DashboardOverviewComponent} from "../../dashboard/dashboard-overview/dashboard-overview.component";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, DecimalPipe, NgIf} from "@angular/common";
import {AbosListComponent} from "../abos-list/abos-list.component";
import {AbosStoreV2} from "../../../stores/abosV2.store";
import {AbosDetailComponent} from "../abos-detail/abos-detail.component";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import {MatGridTile} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-abos-overview',
  standalone: true,
  imports: [
    DashboardDetailComponent,
    DashboardMainComponent,
    DashboardOverviewComponent,
    MatFabButton,
    MatIcon,
    NgIf,
    AbosListComponent,
    AsyncPipe,
    AbosDetailComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatGridTile,
    DecimalPipe,
    MatDivider
  ],
  templateUrl: './abos-overview.component.html',
  styleUrl: './abos-overview.component.scss'
})
export class AbosOverviewComponent {

  panelOpenState = false;
  constructor(
    public abosStore : AbosStoreV2,) {
  }
}
