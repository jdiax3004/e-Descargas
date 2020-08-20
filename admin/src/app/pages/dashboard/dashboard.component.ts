import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { PeliculasService } from "../../services/peliculas.service";
import { LibrosService } from "../../services/libros.service";
import { MusicaService } from "../../services/musica.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  totalPeliculas = 0;
  totalLibros = 0;
  totalCanciones = 0;
  constructor(
    public auth: AuthService,
    peliculasServices: PeliculasService,
    librosService: LibrosService,
    musicaServices: MusicaService
  ) {
    peliculasServices.obtener().subscribe((data) => {
      this.totalPeliculas = data.length;
    });

    librosService.obtener().subscribe((data) => {
      this.totalLibros = data.length;
    });

    musicaServices.obtener().subscribe((data) => {
      this.totalCanciones = data.length;
    });
  }
  // Donas
  labels1 = ["Musica", "Libros", "Peliculas"];
  data = [[100, 450, 100]];

  // Barras

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

  // Pie
  pieLabels = [["Download", "Sales"], ["In", "Store", "Sales"], "Mail Sales"];

  dataPie = [500, 500, 100];
}
