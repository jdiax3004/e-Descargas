import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {
  objeto: Usuario = new Usuario();
  confirmarContrasenna: string = '';
  contrasenna: string = '';
  nuevacontrasenna: string = '';
  constructor(private service:UsuarioService, private auth:AuthService, private alert:AlertService) { }

  ngOnInit() {
  }
  

  submit() {
    this.alert.showLoading()
    if(this.nuevacontrasenna == this.confirmarContrasenna && this.contrasenna == this.auth.actual.Contrasenna){
      this.service.modificar({Codigo: this.auth.actual.Codigo,Contrasenna:this.nuevacontrasenna}).subscribe(response => {
        this.alert.success('Elemento creado correctamente!');
      }, err => this.alert.handleError(err))
    }else{
      this.alert.error("Las contraseñas no coinciden");
    }
  }

}
