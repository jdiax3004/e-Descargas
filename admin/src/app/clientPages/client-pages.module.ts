import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { CLIENT_PAGES_ROUTES } from './clientPage.routes';
import { ClientPagesComponent } from './client-pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { LibrosComponent } from './libros/libros.component';
import { MusicaComponent } from './musica/musica.component';
import { MetodosPagoComponent } from './metodos-pago/metodos-pago.component';
import { PagoTarjetaComponent } from './pago-tarjeta/pago-tarjeta.component';
import { PagoEasypayComponent } from './pago-easypay/pago-easypay.component';




@NgModule({
  declarations: [ClientPagesComponent, PerfilComponent, PeliculasComponent, LibrosComponent, MusicaComponent, MetodosPagoComponent, PagoTarjetaComponent, PagoEasypayComponent],
  imports: [
    CommonModule,FormsModule,SharedModule,CLIENT_PAGES_ROUTES
  ],
})
export class ClientPagesModule { }
