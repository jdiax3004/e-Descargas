import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { LibrosService } from 'src/app/services/libros.service';
import { AlertService } from 'src/app/services/alert.service';
import { GeneroLibroService } from 'src/app/services/genero-libro.service';
import { IdiomaService } from 'src/app/services/idioma.service';
import { ActivatedRoute } from '@angular/router';
import { ArchivosService } from 'src/app/services/archivos.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {

  id: string;
  esCreacion: boolean = true;
  objeto: Libro = new Libro();
  generos: any[] = [];
  idiomas: any[] = [];

  archivoDescarga: File;
  archivoVisualizacion: File;

  extencionesPermitidasDescarga = ['pdf']
  extencionesPermitidasVisualizacion = ['png', 'jpeg', 'jpg']

  constructor(private servicio: LibrosService, private generoService: GeneroLibroService, private archivosService: ArchivosService, private route: ActivatedRoute, private idiomaService: IdiomaService, private alert: AlertService) { }
  
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
      formData.append("tipo", "Archivo_Descarga_Libros");
      formData.append("file", this.archivoDescarga);
      const { url } = await this.archivosService.subir(formData).catch(err => this.alert.handleError(err));
      if(!url) return
      this.objeto.Archivo_Descarga = url;
    }

    if(this.archivoVisualizacion) {
      let formData = new FormData();
      formData.append("tipo", "Archivo_Visualizacion_Libros");
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
