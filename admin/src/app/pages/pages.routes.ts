import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { AsignarRolesComponent } from './asignar-roles/asignar-roles.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { ConsecutivoComponent } from './consecutivos/consecutivos.component';
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
import { ADMINISTRADOR, SEGURIDAD, CONSECUTIVO, CONSULTA, MANTENIMIENTO } from '../constants/roles-usuarios';
import { CrearConsecutivosComponent } from './crear-consecutivos/crear-consecutivos.component';

const pagesRoutes: Routes = [
  {
    path: "admin",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
        data: { titulo: "Dashboard", Id_Roles: [ADMINISTRADOR] },
        canActivate: [AuthGuard]
      },
      {
        path: "crearUsuario",
        component: CrearUsuarioComponent,
        data: { titulo: "Crear usuario", Id_Roles: [ADMINISTRADOR, SEGURIDAD] },
        canActivate: [AuthGuard]
      },
      {
        path: "asignarRol",
        component: AsignarRolesComponent,
        data: { titulo: "Asignar Roles", Id_Roles: [ADMINISTRADOR, SEGURIDAD] },
        canActivate: [AuthGuard]
      },
      {
        path: "cambiarContrasena",
        component: CambiarContrasenaComponent,
        data: { titulo: "Cambiar Contraseña", Id_Roles: [ADMINISTRADOR] },
        canActivate: [AuthGuard]
      },
      {
        path: "consecutivos",
        component: ConsecutivoComponent,
        data: { titulo: "Lista de Consecutivos", Id_Roles: [ADMINISTRADOR, CONSECUTIVO, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "parametros",
        component: ParametrosComponent,
        data: { titulo: "Paramentros", Id_Roles: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "libros",
        component: LibrosComponent,
        data: { titulo: "Libros", Id_Roles: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "musica",
        component: MusicaComponent,
        data: { titulo: "Musica", Id_Roles: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "peliculas",
        component: PeliculasComponent,
        data: { titulo: "peliculas", Id_Rol: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "descargas",
        component: DescargasComponent,
        data: { titulo: "Descargas", Id_Roles: [ADMINISTRADOR, CONSULTA] },
        canActivate: [AuthGuard]
      },
      {
        path: "errores",
        component: ErroresComponent,
        data: { titulo: "Errores", Id_Roles: [ADMINISTRADOR, CONSULTA] },
        canActivate: [AuthGuard]
      },
      {
        path: "transacciones",
        component: TransaccionesComponent,
        data: { titulo: "Transacciones", Id_Roles: [ADMINISTRADOR, CONSULTA] },
        canActivate: [AuthGuard]
      },
      {
        path: "bitacora",
        component: BitacoraComponent,
        data: { titulo: "Bitacora", Id_Rol: [ADMINISTRADOR, CONSULTA] },
        canActivate: [AuthGuard]
      },
      {
        path: "crearPelicula/:id",
        component: CrearPeliculaComponent,
        data: { titulo: "Crear nueva pelicula", Id_Roles: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "crearLibro/:id",
        component: CrearLibroComponent,
        data: { titulo: "Crear nuevo libro", Id_Roles: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "crearCancion/:id",
        component: CrearCancionComponent,
        data: { titulo: "CrearCancion", Id_Roles: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "consultarBitacora/:id",
        component: ConsultaBitacoraComponent,
        data: { titulo: "Consulta Bitácora", Id_Roles: [ADMINISTRADOR, CONSULTA] },
        canActivate: [AuthGuard]
      },
      {
        path: "crearConsecutivos/:id",
        component: CrearConsecutivosComponent,
        data: { titulo: "Crear Consecutivo", Id_Roles: [ADMINISTRADOR, CONSECUTIVO, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "crearPeliculas/:id",
        component: CrearPeliculaComponent,
        data: { titulo: "Crear Peliculas", Id_Roles: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
      {
        path: "crearLibros/:id",
        component: CrearLibroComponent,
        data: { titulo: "Crear Libros", Id_Roles: [ADMINISTRADOR, MANTENIMIENTO] },
        canActivate: [AuthGuard]
      },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
