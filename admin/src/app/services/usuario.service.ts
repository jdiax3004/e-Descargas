import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CRUDService<Usuario> {

  constructor(private http: HttpClient) {
    super(http, '/usuarios');
  }

  login(Usuario: string, Contrasenna: string) {
    let usuario = { Usuario, Contrasenna };
    return this.http.post(`${environment.apiUrl}/login`, usuario,  {
      withCredentials: true
    });
  }

  logout() {
    return this.http.get(`${environment.apiUrl}/logout`);
  }

  actual() {
    return this.http.get(`${environment.apiUrl}/actual`, {
      withCredentials: true
    });
  }
}