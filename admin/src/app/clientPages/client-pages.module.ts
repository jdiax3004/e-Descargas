import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { ModalModule } from 'ngx-bootstrap/modal';
import { CLIENT_PAGES_ROUTES } from './clientPage.routes';
import { ClientPagesComponent } from './client-pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { LibrosComponent } from './libros/libros.component';
import { MusicaComponent } from './musica/musica.component';
import { MetodosPagoComponent } from './metodos-pago/metodos-pago.component';
import { PagoTarjetaComponent } from './pago-tarjeta/pago-tarjeta.component';
import { PagoEasypayComponent } from './pago-easypay/pago-easypay.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientSidebarComponent } from './components/client-sidebar/client-sidebar.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { CompraExitosaComponent } from './compra-exitosa/compra-exitosa.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [ClientPagesComponent, PerfilComponent, PeliculasComponent, LibrosComponent, MusicaComponent, MetodosPagoComponent, PagoTarjetaComponent, PagoEasypayComponent, ClientSidebarComponent, CompraExitosaComponent, DashboardComponent],
  imports: [
    CommonModule,HttpClientModule,FormsModule,SharedModule,CLIENT_PAGES_ROUTES,ModalModule.forRoot()
  ],
  providers: [AuthGuardService]
})
export class ClientPagesModule { }
