import { Component, OnInit } from '@angular/core';
import { ConsecutivosService } from 'src/app/services/consecutivos.service';
import { AlertService } from 'src/app/services/alert.service';
import { Consecutivo } from 'src/app/models/consecutivo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-consecutivos',
  templateUrl: './crear-consecutivos.component.html',
  styleUrls: ['./crear-consecutivos.component.css']
})
export class CrearConsecutivosComponent implements OnInit {

  id: string;
  esCreacion: boolean = true;
  objeto: Consecutivo = new Consecutivo()

  constructor(private servicio: ConsecutivosService,private route: ActivatedRoute, private alert: AlertService ) { }
  


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.servicio.obtenerUno(this.id).subscribe(data => {
      this.objeto = data
      this.esCreacion = false
    })
  }

  submit() {
    this.alert.showLoading()
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
