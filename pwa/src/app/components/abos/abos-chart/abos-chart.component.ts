import {Component} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgIf} from "@angular/common";
import {AbosStore} from "../../../stores/abos.store";
import {BarController, ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-abos-chart',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    NgIf,
    AsyncPipe,
    BaseChartDirective,
  ],
  templateUrl: './abos-chart.component.html',
  styleUrl: './abos-chart.component.scss'
})
export class AbosChartComponent {

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartConfiguration['data'] = {
    labels: [], // Tag names here
    datasets: [
      { data: [], label: 'Expenses per Tag' } // Expenses here
    ]
  };

  constructor(public abosStore : AbosStore,) {
    this.prepareChartData();
  }

  prepareChartData(): void {
    // Assuming you have a service or method to fetch or calculate these values
    const tags = ['Housing', 'Groceries', 'Mobility', 'Entertainment', 'Health', 'Education', 'Insurance'];
    const expenses = [1200, 600, 300, 150, 200, 100, 250]; // Example expenses

    this.barChartData.labels = tags;
    this.barChartData.datasets[0].data = expenses;
  }
}
