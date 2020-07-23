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

}
