import { Component, OnInit } from "@angular/core";

declare function init_plugins();

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.css"],
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string = ""
  constructor() {}

  ngOnInit() {
    init_plugins();
  }
}
