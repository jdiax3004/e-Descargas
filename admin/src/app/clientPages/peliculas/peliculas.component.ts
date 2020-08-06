import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { AlertService } from 'src/app/services/alert.service';
import { Pelicula } from 'src/app/models/pelicula';
import { GeneroPeliculaService } from '../../services/genero-pelicula.service';
import { IdiomaService } from '../../services/idioma.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  constructor(private service:PeliculasService, private alert: AlertService, 
    private generoService: GeneroPeliculaService, private idiomasService: IdiomaService, private carrito: CarritoService) { }
  objetos: Pelicula[] = [];
  filtros: any = {};
  generos: any[] = [];
  idiomas: any[] = [];
  ngOnInit() {
    //this.cargar();
    this.cargarGeneros();
    this.cargarIdiomas();
  }

  cargarGeneros() {
    this.generoService.obtener().subscribe(result => {
      this.generos = result
    })
  }

  cargarIdiomas() {
    this.idiomasService.obtener().subscribe(result => {
      this.idiomas = result;
    })
  }

  cargar() {
    if(!this.verificarParametros(this.filtros)) {
      this.alert.error('No ingreso parametros');
      return;
    }
    this.alert.showLoading()
    this.service.obtener(this.filtros).subscribe(data => {
      this.objetos = data;
      this.alert.hideLoading();
    })
  }

  verificarParametros(obj) {
    if (Object.keys(obj).length === 0) return false;
    for(let key of Object.keys(obj)) {
      if(obj[key] !== "") {
        return true;
      }
    }
    return false;
  }

  agregarAlCarrito(item: Pelicula) {
    this.carrito.agregar(item)
  }

  comprar(item: Pelicula) {
    this.agregarAlCarrito(item)
    this.carrito.checkout()
  }

}
