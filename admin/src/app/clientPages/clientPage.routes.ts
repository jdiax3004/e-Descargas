import { Routes, RouterModule } from "@angular/router";
import { ClientPagesComponent } from './client-pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LibrosComponent } from './libros/libros.component';
import { MusicaComponent } from './musica/musica.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { MetodosPagoComponent } from './metodos-pago/metodos-pago.component';
import { PagoTarjetaComponent } from './pago-tarjeta/pago-tarjeta.component';
import { PagoEasypayComponent } from './pago-easypay/pago-easypay.component';

const clientPagesRoutes: Routes = [
    {
      path: "client",
      component: ClientPagesComponent,
      //canActivate: [AuthGuard],
      children: [
        /*{
          path: "",
          component: DashboardComponent,
          data: { titulo: "Dashboard", Id_Rol: [ADMINISTRADOR] },
          canActivate: [AuthGuard]
        },*/
        {
            path: "perfil",
            component: PerfilComponent,
            //data: { titulo: "Perfil", Id_Rol: [ADMINISTRADOR] },
            //canActivate: [AuthGuard]
        },
        {
            path: "peliculas",
            component: PeliculasComponent,
            //data: { titulo: "Perfil", Id_Rol: [ADMINISTRADOR] },
            //canActivate: [AuthGuard]
        },
        {
            path: "musica",
            component: MusicaComponent,
            //data: { titulo: "Perfil", Id_Rol: [ADMINISTRADOR] },
            //canActivate: [AuthGuard]
        },
        {
            path: "libros",
            component: LibrosComponent,
            //data: { titulo: "Perfil", Id_Rol: [ADMINISTRADOR] },
            //canActivate: [AuthGuard]
        },
        {
          path: "metodospago",
          component: MetodosPagoComponent,
          //data: { titulo: "Perfil", Id_Rol: [ADMINISTRADOR] },
          //canActivate: [AuthGuard]
        },
        {
          path: "tarjeta",
          component: PagoTarjetaComponent,
          //data: { titulo: "Perfil", Id_Rol: [ADMINISTRADOR] },
          //canActivate: [AuthGuard]
        },
        {
          path: "easypay",
          component: PagoEasypayComponent,
          //data: { titulo: "Perfil", Id_Rol: [ADMINISTRADOR] },
          //canActivate: [AuthGuard]
        },
      ]
    }
]

export const CLIENT_PAGES_ROUTES = RouterModule.forChild(clientPagesRoutes);