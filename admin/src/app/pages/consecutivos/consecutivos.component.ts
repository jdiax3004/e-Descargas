import { Component, OnInit } from '@angular/core';
import { ConsecutivosService } from 'src/app/services/consecutivos.service';
import { AlertService } from 'src/app/services/alert.service';
import { Consecutivo } from 'src/app/models/consecutivo';

@Component({
  selector: 'app-consecutivos',
  templateUrl: './consecutivos.component.html',
  styleUrls: ['./consecutivos.component.css']
})
export class ConsecutivoComponent implements OnInit {

  constructor(private service:ConsecutivosService, private alert: AlertService ) { }
  objetos: Consecutivo[] = [];


  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service.obtener().subscribe(data => {
      this.objetos = data;
    })
  }

}
