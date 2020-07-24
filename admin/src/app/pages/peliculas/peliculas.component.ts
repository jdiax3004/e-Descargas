import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { AlertService } from 'src/app/services/alert.service';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  constructor(private service:PeliculasService, private alert: AlertService) { }
  objetos: Pelicula[] = [];
  ngOnInit() {
    this.cargar();
  }
  cargar() {
    this.service.obtener().subscribe(data => {
      this.objetos = data;
    })
  }

  delete(id:string){
    this.alert.preConfirmLoading('¿Esta seguro?', 'La acción eliminará el objeto.', () => new Promise((resolve, reject) => {
      this.service.eliminar(id).subscribe(result => { 
        this.cargar();
        resolve('Elemento eliminado correctamente!')
      }, error => reject('No se pudo eliminar el objeto.'))
    }))
  }

}
