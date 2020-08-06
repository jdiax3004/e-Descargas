import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { AlertService } from 'src/app/services/alert.service';
import { GeneroPeliculaService } from 'src/app/services/genero-pelicula.service';
import { IdiomaService } from 'src/app/services/idioma.service';
import { ActivatedRoute } from '@angular/router';
import { ArchivosService } from 'src/app/services/archivos.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {
 
  id: string;
  esCreacion: boolean = true;
  objeto: Pelicula = new Pelicula();
  generos: any[] = [];
  idiomas: any[] = [];

  archivoDescarga: File;
  archivoVisualizacion: File;

  extencionesPermitidasDescarga = ['mp4']
  extencionesPermitidasVisualizacion = ['mp4']

  constructor(private servicio: PeliculasService, private generoService: GeneroPeliculaService, private route: ActivatedRoute, private archivosService: ArchivosService, private idiomaService: IdiomaService, private alert: AlertService) { }
  
  ngOnInit() {
    
    this.cargarGeneros();
    this.cargarIdiomas();
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id  != 'nueva') {
      this.servicio.obtenerUno(this.id).subscribe(data => {
        this.objeto = data
        this.esCreacion = false
      })
    }
  }

  cargarGeneros() {
    this.generoService.obtener().subscribe(response => {
      this.generos = response;
      if(this.esCreacion) this.objeto.Id_Genero = response[0].Id;
    });
  }

  cargarIdiomas() {
    this.idiomaService.obtener().subscribe(response => {
      this.idiomas = response;
      if(this.esCreacion) this.objeto.Id_Idioma = response[0].Id;
    });
  }

  onArchivoDescargaChange(file: File) {
    const ext = file.name.split('.').pop()
    if(!this.extencionesPermitidasDescarga.includes(ext)) {
      this.alert.error(`El tipo de archivo ${ext} no es permitido.`)
    } else {
      this.archivoDescarga = file;
    }
  }

  onArchivoVisualizacionChange(file: File) {
    const ext = file.name.split('.').pop()
    if(!this.extencionesPermitidasVisualizacion.includes(ext)) {
      this.alert.error(`El tipo de archivo ${ext} no es permitido.`)
    } else {
      this.archivoVisualizacion = file;
    }
  }


  async submit() {
    this.alert.showLoading();
    

    if(this.archivoDescarga) {
      let formData = new FormData();
      formData.append("tipo", "Archivo_Descarga_Peliculas");
      formData.append("file", this.archivoDescarga);
      const { url } = await this.archivosService.subir(formData).catch(err => this.alert.handleError(err));
      if(!url) return
      this.objeto.Archivo_Descarga = url;
    }

    if(this.archivoVisualizacion) {
      let formData = new FormData();
      formData.append("tipo", "Archivo_Visualizacion_Peliculas");
      formData.append("file", this.archivoVisualizacion);
      const { url } = await this.archivosService.subir(formData).catch(err => this.alert.handleError(err));
      if(!url) return
      this.objeto.Archivo_Previsualizacion = url;
    }

    if(this.esCreacion) {
      this.servicio.insertar(this.objeto).subscribe(response => {
        this.alert.success('Elemento creado correctamente!');
      }, err => this.alert.handleError(err))
    } else {
      this.servicio.modificar(this.objeto).subscribe(response => {
        this.alert.success('Elemento actualizado correctamente!');
      }, err => this.alert.handleError(err))
    } 
  }
}
