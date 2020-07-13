import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PAGES_ROUTES } from "./pages.routes";
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { AsignarRolesComponent } from './asignar-roles/asignar-roles.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { ConsecutivosComponent } from './consecutivos/consecutivos.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { LibrosComponent } from './libros/libros.component';
import { MusicaComponent } from './musica/musica.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { DescargasComponent } from './descargas/descargas.component';
import { ErroresComponent } from './errores/errores.component';
import { CrearPeliculaComponent } from './crear-pelicula/crear-pelicula.component';
import { CrearLibroComponent } from './crear-libro/crear-libro.component';
import { CrearCancionComponent } from './crear-cancion/crear-cancion.component';
import { ConsultaBitacoraComponent } from './consulta-bitacora/consulta-bitacora.component';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, CrearUsuarioComponent, AsignarRolesComponent, CambiarContrasenaComponent, ConsecutivosComponent, ParametrosComponent, PeliculasComponent, LibrosComponent, MusicaComponent, BitacoraComponent, TransaccionesComponent, DescargasComponent, ErroresComponent, CrearPeliculaComponent, CrearLibroComponent, CrearCancionComponent, ConsultaBitacoraComponent],
  imports: [CommonModule, SharedModule, PAGES_ROUTES],
  exports: [DashboardComponent],
})
export class PagesModule {}
