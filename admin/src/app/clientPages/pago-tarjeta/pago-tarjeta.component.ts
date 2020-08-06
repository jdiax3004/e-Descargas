import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { AlertService } from 'src/app/services/alert.service';
import { TARJETA } from 'src/app/constants/metodos-pago';
import { Tarjeta } from 'src/app/models/tarjeta';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.css']
})
export class PagoTarjetaComponent implements OnInit {

  metodoPago: Tarjeta = {}

  constructor(private service: TransaccionService, private alert: AlertService, private carrito: CarritoService) { }

  ngOnInit() {
  }

  submit() {
    this.carrito.procesar(TARJETA, this.metodoPago)
  }

}
