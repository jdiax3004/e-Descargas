import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { AlertService } from 'src/app/services/alert.service';
import { Transaccion } from 'src/app/models/transaccion';
import { Tarjeta } from 'src/app/models/tarjeta';
import { EasyPay } from 'src/app/models/easypay';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {

  constructor(private service:TransaccionService, private alert:AlertService) { }

  objetos: Transaccion[] = [];
  filtros: Transaccion = {};

  ngOnInit() {
    this.cargar();
  }
  cargar() {
    this.service.obtener().subscribe(data => {
      this.objetos = data;
    })
  }

  submit() {
    this.alert.showLoading()
    this.service.obtener(this.filtros).subscribe(data => {
      this.objetos = data;
      this.alert.hideLoading();
    })
  }
}
