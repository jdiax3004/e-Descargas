import { Component, OnInit } from '@angular/core';
import { ConsecutivosService } from 'src/app/services/consecutivos.service';
import { AlertService } from 'src/app/services/alert.service';
import { Consecutivo } from 'src/app/models/consecutivo';

@Component({
  selector: 'app-crear-consecutivos',
  templateUrl: './crear-consecutivos.component.html',
  styleUrls: ['./crear-consecutivos.component.css']
})
export class CrearConsecutivosComponent implements OnInit {

  objeto: Consecutivo = new Consecutivo();
  constructor(private servicio:ConsecutivosService, private alert: AlertService ) { }
  


  ngOnInit() {


    
  }

  submit() {
    this.alert.showLoading()
      this.servicio.insertar(this.objeto).subscribe(response => {
      this.alert.success('Elemento creado correctamente!');
    }, this.alert.handleError)
  }

}
