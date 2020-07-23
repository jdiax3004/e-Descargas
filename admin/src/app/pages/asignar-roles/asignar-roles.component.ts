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

  usuarioSeleccionado: Usuario = {}

  constructor(private servicio: UsuarioService, private rolServicio: RolService, private alert: AlertService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios() {
    this.servicio.obtener().subscribe(response => {
      this.usuarios = response;
    })
  }

  cargarRoles() {
    this.rolServicio.obtener().subscribe(response => {
      this.roles = response;
    })
  }

  onUsuarioChange() {
    console.log(this.usuarioSeleccionado)
  }

  submit() {
    this.alert.showLoading()
    this.servicio.modificar(this.usuarioSeleccionado).subscribe(response => {
      this.alert.success('Elemento Actualizado!');
    }, this.alert.handleError);
  }

}
