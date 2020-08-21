import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { PeliculasService } from "../../services/peliculas.service";
import { LibrosService } from "../../services/libros.service";
import { MusicaService } from "../../services/musica.service";
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  totalPeliculas = 0;
  totalLibros = 0;
  totalCanciones = 0;
  totalUsuarios = 0;
  constructor(
    public auth: AuthService,
    peliculasServices: PeliculasService,
    librosService: LibrosService,
    musicaServices: MusicaService,
    usuarioService: UsuarioService
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

    usuarioService.obtener().subscribe((data) => {
      this.totalUsuarios = data.length;
    });
  }
  // Donas
  labels1 = ["Musica", "Libros", "Peliculas"];
  data = [[32, 23, 54]];

  // Barras

  dataBar = [
    { data: [18, 68, 30, 98], label: "Música" },
    { data: [18, 48, 10, 79], label: "Libros" },
    { data: [68, 46, 10, 49], label: "Peliculas" },
  ];
  labelsBar = ["Junio", "Julio", "Agosto", "Setiembre"];

  // Pie
  pieLabels = [["Easypay"], ["Tarjetas"]];

  dataPie = [500, 300];
}
