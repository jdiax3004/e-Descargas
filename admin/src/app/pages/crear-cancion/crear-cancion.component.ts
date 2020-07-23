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
  confirmarContrasenna: string = '';

  constructor(private servicio: MusicaService, private alert: AlertService) { }

  ngOnInit() {
  }

  submit() {
    this.alert.showLoading()


    this.servicio.insertar(this.objeto).subscribe(response => {
      this.alert.success('Elemento creado correctamente!');
    }, this.alert.handleError)
  }
}
