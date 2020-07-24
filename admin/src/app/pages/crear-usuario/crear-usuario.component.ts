import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertService } from 'src/app/services/alert.service';
import { ADMINISTRADOR } from 'src/app/constants/roles-usuarios';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  objeto: Usuario = new Usuario();
  confirmarContrasenna: string = '';

  constructor(private servicio: UsuarioService, private alert: AlertService) { }

  ngOnInit() {
  }

  submit() {
    this.alert.showLoading()
    this.servicio.insertar(this.objeto).subscribe(response => {
      this.alert.success('Elemento creado correctamente!');
    }, err => this.alert.handleError(err))
  }
}
