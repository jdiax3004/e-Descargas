import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { Libro } from '../models/libro';
import { Musica } from '../models/musica';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { TransaccionService } from './transaccion.service';
import { Tarjeta } from '../models/tarjeta';
import { EasyPay } from '../models/easypay';
import { DescargasService } from './descargas.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private key = 'cart'
  public objetosComprados = []

  constructor(private service: TransaccionService, private descargas: DescargasService, private alert: AlertService, private router: Router) { }

  obtener(): any[] {
    let c = localStorage.getItem(this.key)
    if(c) return JSON.parse(c)
    return []
  }

  obtenerMonto(): number {
    let items = this.obtener();
    let total = 0;

    items.forEach(element => {
      total += element.Precio
    });

    return total;
  }

  private _actualizar(obj: any) {
    localStorage.setItem(this.key, JSON.stringify(obj))
  }

  agregar(item: Pelicula | Libro | Musica) {
    var items = this.obtener()
    // validate if already exist
    if(items.some(i => i.Codigo == item.Codigo)) return
    items.push(item)
    this._actualizar(items)
    this.alert.success("Producto agregado correctamente!")
  }

  eliminar(codigo: string) {
    var items = this.obtener()
    items = items.filter(i => {
      return i.Codigo != codigo
    })
    this._actualizar(items)
  }

  limpiar() {
    localStorage.removeItem(this.key)
  }

  checkout() {
    this.router.navigate(['metodospago'])
  }

  procesar(tipo: string, metodoPago: Tarjeta | EasyPay) {
    this.alert.showLoading()
    let monto = this.obtenerMonto()
    if(this.obtener().length <= 0) return this.alert.error("El carrito esta vacio")

    this.service.insertar({
      Monto: monto,
      Tipo_Pago: tipo,
      Metodo_Pago: metodoPago
    }).subscribe(response => {
      this.alert.success("Compra realizada con éxito!")
      this.objetosComprados = this.obtener()
      this.limpiar()
      this.router.navigate(['compra-exitosa'])
    }, err => this.alert.handleError(err))
  }
}
