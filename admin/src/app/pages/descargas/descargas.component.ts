import { Component, OnInit } from '@angular/core';
import { DescargasService } from 'src/app/services/descargas.service';
import { AlertService } from 'src/app/services/alert.service';
import { Descarga } from 'src/app/models/descarga';

@Component({
  selector: 'app-descargas',
  templateUrl: './descargas.component.html',
  styleUrls: ['./descargas.component.css']
})
export class DescargasComponent implements OnInit {

  constructor(private service:DescargasService, private alert:AlertService) { }
  objetos: Descarga[] = [];
  
  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service.obtener().subscribe(data => {
      this.objetos = data;
    })
  }

}
