import { Routes, RouterModule } from "@angular/router";
import { ClientPagesComponent } from './client-pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LibrosComponent } from './libros/libros.component';
import { MusicaComponent } from './musica/musica.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { MetodosPagoComponent } from './metodos-pago/metodos-pago.component';
import { PagoTarjetaComponent } from './pago-tarjeta/pago-tarjeta.component';
import { PagoEasypayComponent } from './pago-easypay/pago-easypay.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service'

const clientPagesRoutes: Routes = [
    {
      path: "",
      component: ClientPagesComponent,
      canActivate: [AuthGuard],
      children: [
        {
            path: "perfil",
            component: PerfilComponent,
        },
        {
            path: "peliculas",
            component: PeliculasComponent,
        },
        {
            path: "musica",
            component: MusicaComponent,
        },
        {
            path: "libros",
            component: LibrosComponent,
        },
        {
          path: "metodospago",
          component: MetodosPagoComponent,
        },
        {
          path: "tarjeta",
          component: PagoTarjetaComponent,
        },
        {
          path: "easypay",
          component: PagoEasypayComponent,
        },
      ]
    }
]

export const CLIENT_PAGES_ROUTES = RouterModule.forChild(clientPagesRoutes);