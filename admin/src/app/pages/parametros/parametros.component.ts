import { Component, OnInit } from '@angular/core';
import { Parametro } from 'src/app/models/parametro';
import { ParametrosService } from 'src/app/services/parametros.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  params: Parametro[] = [{},{},{},{},{},{}]

  constructor(private service: ParametrosService, private alert: AlertService) { }

  ngOnInit() {
    this.service.obtener().subscribe(response => {
      this.params = response;
    })
  }

  submit() {
    this.alert.showLoading();

    for(let param of this.params) {
      this.service.modificar(param).subscribe(response => {
        this.alert.success(`Parámetro guardado correctamente!`)
      })
    }
  }
}
