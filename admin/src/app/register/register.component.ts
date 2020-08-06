import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  objeto: Usuario = new Usuario();
  constructor(private servicio:UsuarioService,private alert:AlertService,private router:Router) { }

  ngOnInit() {
  }

  submit() {
    this.alert.showLoading()
    this.servicio.insertar(this.objeto).subscribe(response => {
      this.alert.success('Elemento creado correctamente!');
      this.router.navigate(['/login']);
    }, err => this.alert.handleError(err))
  }

}
