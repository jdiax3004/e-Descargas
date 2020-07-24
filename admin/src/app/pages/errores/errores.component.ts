import { Component, OnInit } from '@angular/core';
import { ErroresService } from 'src/app/services/errores.service';
import { AlertService } from 'src/app/services/alert.service';
import { Error } from 'src/app/models/error';

@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ErroresComponent implements OnInit {

  constructor(private service:ErroresService, private alert: AlertService) { }

  objetos: Error[] = [];
  filtros: Error = {};
  ngOnInit() {
    this.cargar();
  }
  cargar() {
    this.service.obtener().subscribe(data => {
      this.objetos = data;
    })
  }

  submit() {
    this.alert.showLoading()
    this.service.obtener(this.filtros).subscribe(data => {
      this.objetos = data;
      this.alert.hideLoading();
    })
  }

}
