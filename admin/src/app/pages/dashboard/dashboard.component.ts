import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  constructor(private auth: AuthService) {}
  labels1 = ["Pan", "Tacos", "Salsa"];
  data = [[100, 450, 100]];

  dataBar = [
    { data: [28, 48, 40, 19, 86, 27, 90, 100, 100], label: "Información" },
  ];

  labelsBar = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
  ];

  pieLabels = [["Download", "Sales"], ["In", "Store", "Sales"], "Mail Sales"];

  dataPie = [500, 500, 100];
}
