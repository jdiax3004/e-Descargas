import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { AuthService } from 'src/app/services/auth.service';
import { DescargasService } from 'src/app/services/descargas.service';

@Component({
  selector: 'app-compra-exitosa',
  templateUrl: './compra-exitosa.component.html',
  styleUrls: ['./compra-exitosa.component.css']
})
export class CompraExitosaComponent implements OnInit {

  constructor(private carrito: CarritoService, private auth: AuthService, private descargas: DescargasService) { }

  ngOnInit() {
    if(!this.carrito.objetosComprados || this.carrito.objetosComprados.length == 0) {
      this.auth.goHome()
    }
  }

  descargar(element) {
    this.descargas.insertar({
      Codigo_Referencia: element.Codigo,
      Genero: element.Genero,
      Tipo: element.Autor ? 'Libro' : element.Actores ? 'Pelicula' : 'Musica'
    }).toPromise()
  }

}
