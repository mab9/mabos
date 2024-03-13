import {Component} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {AbosListComponent} from "../abos-list/abos-list.component";
import {AbosStore} from "../../../stores/abos.store";
import {AbosDetailComponent} from "../abos-detail/abos-detail.component";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import {MatGridTile} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";
import {TagPipe} from "../../../pipes/tag.pipe";
import {AbosChartComponent} from "../abos-chart/abos-chart.component";

@Component({
  selector: 'app-abos-overview',
  standalone: true,
  imports: [
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
    MatDivider,
    NgForOf,
    TagPipe,
    AbosChartComponent
  ],
  templateUrl: './abos-overview.component.html',
  styleUrl: './abos-overview.component.scss'
})
export class AbosOverviewComponent {

  panelOpenState = false;
  panelOpenStateChart = false;
  constructor(
    public abosStore : AbosStore,
    ) {
  }

}
