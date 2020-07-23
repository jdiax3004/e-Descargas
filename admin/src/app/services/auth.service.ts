import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { deleteCookie } from '../utils/cookie.util'
import { UsuarioService } from './usuario.service'
import { Usuario } from '../models/usuario'
import { AlertService } from './alert.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private usuarioService: UsuarioService, private router: Router, private alert: AlertService) { }
  auth_cookie = 'connect.sid'
  cookie_id = 'uid'

  /**
   * Usuario actual logueado en la aplicacion.
   */
  public actual: Usuario

  obtenerActual() {
    return new Promise((resolve, reject) => {
      this.usuarioService.actual().subscribe((data: any) => {
        this.actual = data ? data: null;
        resolve()
      })
    })

  }

  isAuth(roles?: number[]): boolean {
    if (this.actual) {
      if (roles) {
        for(let rol of roles) {
            if(this.actual.Id_Roles.includes(rol)) return true;
        }
        return false;
      } 
      return true;
    }
    return false;
  }

  goHome() {
    this.router.navigate([''])
  }

  login(usuario: string, contrasenna: string) {
    this.alert.showLoading()
    this.usuarioService.login(usuario, contrasenna).subscribe((data: any) => {
      if (data) {
        this.actual = data
        this.alert.hideLoading(`Bienvenido ${this.actual.Nombre}!`)
        this.goHome()
      }
    }, error => {
      console.log(error.status)
      if (error.status == 400)
        this.alert.error('Por favor complete los datos.')
      else if (error.status == 401)
        this.alert.error('Usuario o contraseña incorrecta.')
      else {
        this.alert.handleError(error)
        if (!environment.production) console.log(error)
      }
    })
  }

  logout() {
    this.usuarioService.logout().subscribe(data => {
      console.log('oica')
      this.actual = null
      deleteCookie('connect.sid')
      this.router.navigate(['login'])
    }, error => this.alert.handleError(error))
    
  }
}
