import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { AlertService } from 'src/app/services/alert.service';
import { GeneroPeliculaService } from 'src/app/services/genero-pelicula.service';
import { IdiomaService } from 'src/app/services/idioma.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {
  objeto: Pelicula = new Pelicula();
  generos: any[] = [];
  idiomas: any[] = [];

  archivoDescarga: File;
  archivoVisualizacion: File;

  constructor(private servicio: PeliculasService, private generoService: GeneroPeliculaService, private idiomaService: IdiomaService, private alert: AlertService) { }
  
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
