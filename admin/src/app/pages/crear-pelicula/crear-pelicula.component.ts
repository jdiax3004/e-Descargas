import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { AlertService } from 'src/app/services/alert.service';
import { GeneroPeliculaService } from 'src/app/services/genero-pelicula.service';
import { IdiomaService } from 'src/app/services/idioma.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private servicio: PeliculasService, private generoService: GeneroPeliculaService, private route: ActivatedRoute, private idiomaService: IdiomaService, private alert: AlertService) { }
  
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
    this.archivoDescarga = file;
  }


  submit() {
    this.alert.showLoading()

    // TODO: esto es provisional
    this.objeto.Archivo_Descarga = 'c:/temp';
    this.objeto.Archivo_Previsualizacion = 'c:/temp';

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
