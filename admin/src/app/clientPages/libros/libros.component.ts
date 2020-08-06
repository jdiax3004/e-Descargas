import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { GeneroLibroService } from 'src/app/services/genero-libro.service';
import { IdiomaService } from '../../services/idioma.service';
import { Libro } from 'src/app/models/libro';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  constructor(private libroService: LibrosService, private generoService: GeneroLibroService,
              private idiomasService: IdiomaService, private alert: AlertService) { }

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
    console.log(this.filtros);
    if(!this.verificarParametros(this.filtros)) {
      this.alert.error('No ingreso parametros');
      return;
    }
    this.alert.showLoading()
    this.libroService.obtener(this.filtros).subscribe(data => {
      this.objetos = data;
      console.log(this.objetos);
      this.alert.hideLoading();
    })
  }

  verificarParametros(obj) {
    if (Object.keys(obj).length === 0) return false;
    for(let key of Object.keys(obj)) {
      console.log(obj[key] !== "")
      if(obj[key] !== "") {
        return true;
      }
    }
    return false;
  }
}
