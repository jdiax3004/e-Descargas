import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { AlertService } from 'src/app/services/alert.service';
import { TARJETA } from 'src/app/constants/metodos-pago';
import { Tarjeta } from 'src/app/models/tarjeta';

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.css']
})
export class PagoTarjetaComponent implements OnInit {

  metodoPago: Tarjeta = {}
  monto: number = 300; //TODO: borar esto

  constructor(private service: TransaccionService, private alert: AlertService) { }

  ngOnInit() {
  }

  procesar() {
    this.alert.showLoading();
    this.service.insertar({
      Monto: this.monto,
      Tipo_Pago: TARJETA,
      Metodo_Pago: this.metodoPago
    }).subscribe(response => {
      this.alert.success("Compra realizada con éxito!");
    }, err => this.alert.handleError(err))
  }

}
