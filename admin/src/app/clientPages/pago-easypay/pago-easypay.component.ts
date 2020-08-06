import { Component, OnInit } from '@angular/core';
import { EasyPay } from 'src/app/models/easypay';
import { EASY_PAY } from 'src/app/constants/metodos-pago';
import { EasypayService } from 'src/app/services/easypay.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-pago-easypay',
  templateUrl: './pago-easypay.component.html',
  styleUrls: ['./pago-easypay.component.css']
})
export class PagoEasypayComponent implements OnInit {
  items: EasyPay[] = []
  metodoPago: EasyPay = {}

  constructor(private service: EasypayService, private alert: AlertService, private auth: AuthService, private carrito: CarritoService) { }

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

  setMetodoPago(item: EasyPay) {
    let x = Object. assign({}, item)
    delete x.Id
    this.metodoPago = x
    
  }

  submit() {
    this.carrito.procesar(EASY_PAY, this.metodoPago)
  }

}
