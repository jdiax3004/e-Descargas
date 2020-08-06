import { Injectable } from "@angular/core";
import { CRUDService } from "./CRUDService";
import { Usuario } from "../models/usuario";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsuarioService extends CRUDService<Usuario> {
  constructor(private http: HttpClient) {
    super(http, "usuarios");
  }

  login(Usuario: string, Contrasenna: string) {
    let usuario = { Usuario, Contrasenna };
    return this.http.post(`${environment.apiUrl}/login`, usuario, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.get(`${environment.apiUrl}/logout`);
  }

  actual() {
    return this.http.get(`${environment.apiUrl}/actual`, {
      withCredentials: true,
    });
  }

  recoverPassword(username: string) {
    return this.http.get(
      `${environment.apiUrl}/recuperar-contrasenna?Usuario=${username}`,
      {
        withCredentials: true,
      }
    );
  }

  enviarRespuestaSeguridad(
    codigo: string,
    pregunta: string,
    respuesta: string
  ) {
    return this.http.post(
      `${environment.apiUrl}/recuperar-contrasenna`,
      {
        Codigo: codigo,
        Pregunta_Seguridad: pregunta,
        Respuesta_Seguridad: respuesta,
      },
      {
        withCredentials: true,
      }
    );
  }

  cambiarPass(codigo: string, password: string) {
    return this.http.put(
      `${environment.apiUrl}/usuarios`,
      {
        Codigo: codigo,
        Contrasenna: password,
      },
      {
        withCredentials: true,
      }
    );
  }

  loginFacebook() {
    return this.http.get(`${environment.apiUrl}/auth/facebook`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

      },
      withCredentials: true,
    });
  }
}
