import { Component, Input } from "@angular/core";
import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";

@Component({
  selector: "app-grafica-dona",
  templateUrl: "./grafica-dona.component.html",
  styles: [],
})
export class GraficaDonaComponent {
  @Input("data") doughnutChartData: MultiDataSet = [[]];
  @Input("labels") doughnutChartLabels: Label[] = [];
  // Doughnut
  public doughnutChartType: ChartType = "doughnut";
}
