import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  getUsername = true;
  getAnswer = false;
  getPassword = false;
  pregunta;

  constructor(private usuario: UsuarioService, private alert: AlertService, private router: Router) { }

  ngOnInit() {
  }

  recuperar(form: NgForm) {
    const { Username } = form.value
    this.usuario.recoverPassword(Username).subscribe(data => {
      this.getUsername = false;
      this.getAnswer = true;
      this.pregunta = data;
    });
  }

  enviarRespuesta(form: NgForm) {
    const { SecurityAnswer } = form.value
    this.usuario.enviarRespuestaSeguridad(this.pregunta.Codigo,this.pregunta.Pregunta_Seguridad,SecurityAnswer).subscribe(data => {
      if(data) {
        this.getAnswer = false;
        this.getPassword = true;
      } else {
        this.alert.error('La respuesta fue erronea');
      }
    });
  }

  cambiarContrasenna(form: NgForm){
    const { newPassword } = form.value
    this.usuario.cambiarPass(this.pregunta.Codigo,newPassword).subscribe(data => {
      this.router.navigate(['/login']);
      this.alert.success('Se cambió la contraseña exitosamente');
    });
  }

}
