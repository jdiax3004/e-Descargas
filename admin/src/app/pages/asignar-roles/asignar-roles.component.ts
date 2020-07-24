import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/services/rol.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['./asignar-roles.component.css']
})
export class AsignarRolesComponent implements OnInit {

  usuarios: Usuario[] = []
  roles: any[] = []

  usuarioSeleccionado: Usuario = { Id_Roles: [] }

  constructor(private servicio: UsuarioService, private rolServicio: RolService, private alert: AlertService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios() {
    this.servicio.obtener().subscribe(response => {
      this.usuarios = response;
      this.usuarioSeleccionado = response[0];
    })
  }

  cargarRoles() {
    this.rolServicio.obtener().subscribe(response => {
      this.roles = response;
    })
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
  }

  setRol(id: number) {
    const index = this.usuarioSeleccionado.Id_Roles.indexOf(id);
    if (index > -1) {
      this.usuarioSeleccionado.Id_Roles.splice(index, 1);
    } else {
      this.usuarioSeleccionado.Id_Roles.push(id);
    }
  }

  submit() {
    this.alert.showLoading()
    this.servicio.modificar({ Codigo: this.usuarioSeleccionado.Codigo, Id_Roles: this.usuarioSeleccionado.Id_Roles }).subscribe(response => {
      this.alert.success('Elemento Actualizado!');
    }, this.alert.handleError);
  }

}
