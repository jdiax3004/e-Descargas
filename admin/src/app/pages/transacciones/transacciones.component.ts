import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { AlertService } from 'src/app/services/alert.service';
import { Transaccion } from 'src/app/models/transaccion';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {

  constructor(private service:TransaccionService, private alert:AlertService) { }

  objetos: Transaccion[] = [];
  //filtros: Transaccion = { Tipo: "" };

  ngOnInit() {
    this.cargar();
  }
  cargar() {
    this.service.obtener().subscribe(data => {
      this.objetos = data;
    })
  }
}
