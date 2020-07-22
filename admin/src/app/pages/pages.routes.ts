import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { AsignarRolesComponent } from './asignar-roles/asignar-roles.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { ConsecutivosComponent } from './consecutivos/consecutivos.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { LibrosComponent } from './libros/libros.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { MusicaComponent } from './musica/musica.component';
import { DescargasComponent } from './descargas/descargas.component';
import { ErroresComponent } from './errores/errores.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { CrearPeliculaComponent } from './crear-pelicula/crear-pelicula.component';
import { CrearLibroComponent } from './crear-libro/crear-libro.component';
import { CrearCancionComponent } from './crear-cancion/crear-cancion.component';
import { ConsultaBitacoraComponent } from './consulta-bitacora/consulta-bitacora.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service'
import { ADMINISTRADOR } from '../constants/roles-usuarios';

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { titulo: "Dashboard" },
      },
      {
        path: "crearUsuario",
        component: CrearUsuarioComponent,
        data: { titulo: "Crear usuario", Id_Rol: [ADMINISTRADOR] },
        canActivate: [AuthGuard]
      },
      {
        path: "asignarRol",
        component: AsignarRolesComponent,
        data: { titulo: "Asignar Roles", Id_Rol: [ADMINISTRADOR] },
        canActivate: [AuthGuard]
      },
      {
        path: "cambiarContrasena",
        component: CambiarContrasenaComponent,
        data: { titulo: "Cambiar Contraseña" },
      },
      {
        path: "consecutivos",
        component: ConsecutivosComponent,
        data: { titulo: "Lista de Consecutivos" },
      },
      {
        path: "parametros",
        component: ParametrosComponent,
        data: { titulo: "Paramentros" },
      },
      {
        path: "libros",
        component: LibrosComponent,
        data: { titulo: "Libros" },
      },
      {
        path: "musica",
        component: MusicaComponent,
        data: { titulo: "Musica" },
      },
      {
        path: "peliculas",
        component: PeliculasComponent,
        data: { titulo: "peliculas" },
      },
      {
        path: "descargas",
        component: DescargasComponent,
        data: { titulo: "Descargas" },
      },
      {
        path: "errores",
        component: ErroresComponent,
        data: { titulo: "Errores" },
      },
      {
        path: "transacciones",
        component: TransaccionesComponent,
        data: { titulo: "Transacciones" },
      },
      {
        path: "bitacora",
        component: BitacoraComponent,
        data: { titulo: "Bitacora" },
      },
      {
        path: "crearPelicula/:id",
        component: CrearPeliculaComponent,
        data: { titulo: "Crear nueva pelicula" },
      },
      {
        path: "crearLibro/:id",
        component: CrearLibroComponent,
        data: { titulo: "Crear nuevo libro" },
      },
      {
        path: "crearCancion/:id",
        component: CrearCancionComponent,
        data: { titulo: "CrearCancion" },
      },
      {
        path: "consultarBitacora/:id",
        component: ConsultaBitacoraComponent,
        data: { titulo: "Consulta bitàcora" },
      },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
