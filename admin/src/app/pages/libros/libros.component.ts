import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { AlertService } from 'src/app/services/alert.service';
import { Libro } from 'src/app/models/libro';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  constructor(private service:LibrosService, private alert: AlertService) { }

  objetos: Libro[] = [];
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
        resolve('Elemento eliminado correctamente!')
      }, error => reject('No se pudo eliminar el objeto.'))
    }))
  }

}
