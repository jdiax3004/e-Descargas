import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { LibrosService } from 'src/app/services/libros.service';
import { AlertService } from 'src/app/services/alert.service';
import { GeneroLibroService } from 'src/app/services/genero-libro.service';
import { IdiomaService } from 'src/app/services/idioma.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {
  objeto: Libro = new Libro();
  generos: any[] = [];
  idiomas: any[] = [];

  archivoDescarga: File;
  archivoVisualizacion: File;

  constructor(private servicio: LibrosService, private generoService: GeneroLibroService, private idiomaService: IdiomaService, private alert: AlertService) { }
  
  ngOnInit() {
    this.cargarGeneros();
    this.cargarIdiomas();
  }

  cargarGeneros() {
    this.generoService.obtener().subscribe(response => {
      this.generos = response;
      this.objeto.Id_Genero = response[0].Id;
    });
  }

  cargarIdiomas() {
    this.idiomaService.obtener().subscribe(response => {
      this.idiomas = response;
      this.objeto.Id_Idioma = response[0].Id;
    });
  }

  onArchivoDescargaChange(file: File) {
    this.archivoDescarga = file;
  }



  submit() {
    this.alert.showLoading()

    let formData = new FormData()
    let files = FileList
    if(this.archivoDescarga) formData.append("file", this.archivoDescarga)
    if(this.archivoVisualizacion) formData.append("file", this.archivoVisualizacion)

    // TODO: esto es provisional
    this.objeto.Archivo_Descarga = 'c:/temp';
    this.objeto.Archivo_Previsualizacion = 'c:/temp';

    for(let prop in this.objeto) {
      formData.append(prop, this.objeto[prop])
    }

    this.servicio.insertar(this.objeto).subscribe(response => {
      this.alert.success('Elemento creado correctamente!');
    }, err => this.alert.handleError(err))
  }
}
