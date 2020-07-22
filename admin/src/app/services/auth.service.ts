import { Injectable } from '@angular/core'
import { AlertService } from './alert.service'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { deleteCookie } from '../utils/cookie.util'
import { UsuarioService } from './usuario.service'
import { Usuario } from '../models/usuario'

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

  isAuth(rol?: number): boolean {
    if (this.actual) {
      if (rol) return this.actual.Id_Rol == rol
      return true
    }
    return false
  }

  goHome() {
    this.router.navigate([''])
  }

  login(email: string, password: string) {
    this.alert.showLoading()
    this.usuarioService.login(email, password).subscribe((data: any) => {
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
      console.log(data)
      this.actual = null
      deleteCookie('connect.sid')
      this.router.navigate([''])
    }, error => this.alert.handleError(error))
    
  }
}
