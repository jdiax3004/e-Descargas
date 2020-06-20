import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PAGES_ROUTES } from "./pages.routes";

@NgModule({
  declarations: [PagesComponent, DashboardComponent],
  imports: [CommonModule, SharedModule, PAGES_ROUTES],
  exports: [DashboardComponent],
})
export class PagesModule {}
