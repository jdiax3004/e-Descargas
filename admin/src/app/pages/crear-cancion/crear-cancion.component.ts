import { Component, OnInit } from '@angular/core';
import { Musica } from 'src/app/models/musica';
import { MusicaService } from 'src/app/services/musica.service';
import { AlertService } from 'src/app/services/alert.service';
import { GeneroMusicaService } from 'src/app/services/genero-musica.service';
import { IdiomaService } from 'src/app/services/idioma.service';

@Component({
  selector: 'app-crear-cancion',
  templateUrl: './crear-cancion.component.html',
  styleUrls: ['./crear-cancion.component.css']
})
export class CrearCancionComponent implements OnInit {
  objeto: Musica = new Musica();
  generos: any[] = [];
  idiomas: any[] = [];

  archivoDescarga: File;
  archivoVisualizacion: File;

  constructor(private servicio: MusicaService, private generoService: GeneroMusicaService, private idiomaService: IdiomaService, private alert: AlertService) { }
  
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

    for(let prop in this.objeto) {
      formData.append(prop, this.objeto[prop])
    }

    this.servicio.insertar(formData).subscribe(response => {
      this.alert.success('Elemento creado correctamente!');
    }, this.alert.handleError)
  }
}
