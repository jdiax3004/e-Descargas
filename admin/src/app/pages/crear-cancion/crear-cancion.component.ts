import { Component, OnInit } from '@angular/core';
import { Musica } from 'src/app/models/musica';
import { MusicaService } from 'src/app/services/musica.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-crear-cancion',
  templateUrl: './crear-cancion.component.html',
  styleUrls: ['./crear-cancion.component.css']
})
export class CrearCancionComponent implements OnInit {
  objeto: Musica = new Musica();

  archivoDescarga: File;
  archivoVisualizacion: File;

  constructor(private servicio: MusicaService, private alert: AlertService) { }

  ngOnInit() {
  }

  onArchivoDescargaChange(file: File) {
    this.archivoDescarga = file;
  }

  submit() {
    this.alert.showLoading()

    let formData = new FormData()
    if(this.archivoDescarga) formData.append("file", this.archivoDescarga)

    for(let prop in this.objeto) {
      formData.append(prop, this.objeto[prop])
    }

    this.servicio.insertar(formData).subscribe(response => {
      this.alert.success('Elemento creado correctamente!');
    }, this.alert.handleError)
  }
}
