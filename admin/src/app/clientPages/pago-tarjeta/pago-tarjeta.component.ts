import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { AlertService } from 'src/app/services/alert.service';
import { TARJETA } from 'src/app/constants/metodos-pago';
import { Tarjeta } from 'src/app/models/tarjeta';
import { CarritoService } from 'src/app/services/carrito.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.css']
})
export class PagoTarjetaComponent implements OnInit {
  items: Tarjeta[] = []
  metodoPago: Tarjeta = {}

  constructor(private service: TarjetaService, private alert: AlertService, private auth: AuthService, private carrito: CarritoService) { }

  ngOnInit() {
    this.cargar()
  }

  cargar() {
    this.service.obtener({ Codigo_Usuario: this.auth.actual.Codigo }).subscribe(data => {
      this.items = data;
      console.log(data)
    }, err => this.alert.handleError(err))
  }

  guardar() {
    this.alert.showLoading()
    this.metodoPago.Tipo = "visa" //TODO: esto esta quemado
    this.service.insertar(this.metodoPago).subscribe(data => {
      this.alert.success("Elemento guardado correctamente!")
      this.cargar()
    }, err => this.alert.handleError(err))
  }

  eliminar(item: any) {
    this.alert.showLoading()
    this.service.eliminar(item.Id).subscribe(data => {
      this.alert.success("Elemento eliminado correctamente!")
      this.cargar()
    }, err => this.alert.handleError(err))
  }


  setMetodoPago(item: Tarjeta) {
    let x = Object. assign({}, item)
    delete x.Id
    this.metodoPago = x
    
  }

  submit() {
    this.metodoPago.Tipo = "visa" //TODO: esto esta quemado
    this.carrito.procesar(TARJETA, this.metodoPago)
  }

}
