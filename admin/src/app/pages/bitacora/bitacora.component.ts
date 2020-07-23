import { Component, OnInit } from '@angular/core';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { AlertService } from 'src/app/services/alert.service';
import { Bitacora } from 'src/app/models/bitacora';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  constructor(private service:BitacoraService, private alert: AlertService) { }

  objetos: Bitacora[] = [];
  ngOnInit() {
    this.cargar();
  }
  cargar() {
    this.service.obtener().subscribe(data => {
      this.objetos = data;
    })
  }

}
