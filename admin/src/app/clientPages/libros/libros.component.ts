import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { GeneroLibroService } from 'src/app/services/genero-libro.service';
import { IdiomaService } from '../../services/idioma.service';
import { Libro } from 'src/app/models/libro';
import { AlertService } from '../../services/alert.service';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  constructor(private libroService: LibrosService, private generoService: GeneroLibroService,
              private idiomasService: IdiomaService, private alert: AlertService, private carrito: CarritoService) { }

  objetos: Libro[] = [];
  filtros: any = {};
  generos: any[] = [];
  idiomas: any[] = [];
  ngOnInit() {
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
    this.libroService.obtener(this.filtros).subscribe(data => {
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

  agregarAlCarrito(item: Libro) {
    this.carrito.agregar(item)
  }

  comprar(item: Libro) {
    this.agregarAlCarrito(item)
    this.carrito.checkout()
  }
}
