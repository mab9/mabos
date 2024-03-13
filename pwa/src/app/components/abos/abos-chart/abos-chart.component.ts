import {Component, OnInit, ViewChild} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {AbosStore} from "../../../stores/abos.store";
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {map, Observable} from "rxjs";
import {Abo} from "../../../model/abos.model";
import {TagsEnumColors, TagsEnum} from "../../../model/tags.enum";
import {TagPipe} from "../../../pipes/tag.pipe";

@Component({
  selector: 'app-abos-chart',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    NgIf,
    AsyncPipe,
    BaseChartDirective,
    NgForOf,
    TagPipe,
    JsonPipe,
  ],
  templateUrl: './abos-chart.component.html',
  styleUrl: './abos-chart.component.scss'
})
export class AbosChartComponent implements OnInit {

  // reference to be able to repaint on abo updates.
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  private tagPipe = new TagPipe();
  public abosGroupedByTagsAndMonthlyCosts$: Observable<Map<string, number>> | null = null;
  public chartOptions: ChartConfiguration['options'] = {responsive: true,};
  public chartType: ChartType = 'pie';
  public chartLegend = false;
  public chartData: ChartConfiguration['data'] = {
    labels: new Array<string>,
    datasets: [
      {
        data: [],
        backgroundColor: new Array<string>,
        //hoverBackgroundColor : new Array<string>,
        label: ' Expenses per Month',
      }
    ]
  };

  tagsWithColors;

  constructor(public abosStore: AbosStore,) {
    this.tagsWithColors = Object.entries(TagsEnum).map(([key, value]) => ({
      name: value,
      color: TagsEnumColors[key as keyof typeof TagsEnum]
    }));

    this.abosGroupedByTagsAndMonthlyCosts$ = this.abosStore.abos$.pipe(
      map(abos => abos.filter(abo => abo.active)),
      map(abos => abos.filter(abo => abo.tag)),
      map(abos => this.groupByTag(abos)),
      map(groups => this.createMapTagsByMontlyCosts(groups))
    );
  }

  ngOnInit() {
    this.abosGroupedByTagsAndMonthlyCosts$!.subscribe(values => {
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      this.chartData.datasets[0].backgroundColor = new Array<string>;

      const back = new Array<string>;

      values.forEach((value, key) => {

        this.chartData.labels!.push(this.tagPipe.transform(key));
        this.chartData.datasets[0].data.push(value);
        // @ts-ignore
        back.push(TagsEnumColors[key])
      });

      // somehow it does not work to directly push to backgroundColor array.
      this.chartData.datasets[0].backgroundColor = back;

      // Trigger an update to the chart manually.
      // This is a common requirement for chart libraries like Chart.js when used within Angular,
      // as changes to the data may not automatically cause the chart to re-render.
      if (this.chart) {
        this.chart.update();
      }
    });
  }

  public tagColor(tag : TagsEnum) {
    return TagsEnumColors[tag];
  }

  private groupBy<T>(arr: T[], fn: (item: T) => any) {
    return arr.reduce<Record<string, T[]>>((prev, curr) => {
      const groupKey = fn(curr);
      const group = prev[groupKey] || [];
      group.push(curr);
      return { ...prev, [groupKey]: group };
    }, {});
  }

  private groupByTag(abos : Abo[]) {
    return this.groupBy(abos, (a) => a.tag)
  }

  private sumTotalPerGroup(groupKey: string, abos: Abo[]): [string, number] {
    const total = abos.reduce((acc, abo) => acc + this.abosStore.normalizePriceToPricePerMonth(abo), 0);
    return [groupKey, this.abosStore.roundUpToNearestFiveCents(total)];
  }

  private createMapTagsByMontlyCosts(groups : Record<string, Abo[]>) : Map<string, number> {
    return new Map<string, number>(
      Object.entries(groups).map(([groupKey, abos]) =>
        this.sumTotalPerGroup(groupKey, abos)
      )
    )
  }


  protected readonly TagsEnumColors = TagsEnumColors;
}
