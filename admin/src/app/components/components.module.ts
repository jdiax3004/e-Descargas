import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";

import { GraficaDonaComponent } from "./grafica-dona/grafica-dona.component";
import { GraficaBarrasComponent } from "./grafica-barras/grafica-barras.component";
import { GraficaPieComponent } from "./grafica-pie/grafica-pie.component";

@NgModule({
  declarations: [
    GraficaDonaComponent,
    GraficaBarrasComponent,
    GraficaPieComponent,
  ],
  exports: [GraficaDonaComponent, GraficaBarrasComponent, GraficaPieComponent],
  imports: [CommonModule, ChartsModule],
})
export class ComponentsModule {}
