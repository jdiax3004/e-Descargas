import { Component, OnInit, Input } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";

@Component({
  selector: "app-grafica-barras",
  templateUrl: "./grafica-barras.component.html",
  styles: [],
})
export class GraficaBarrasComponent implements OnInit {
  @Input("data") barChartData: ChartDataSets[] = [];
  @Input("labels") barChartLabels: Label[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  public;
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  constructor() {}

  ngOnInit() {}
}
