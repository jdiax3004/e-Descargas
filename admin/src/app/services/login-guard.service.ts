import { Injectable } from '@angular/core'
import { 
  Router,
  CanActivate
} from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.auth.obtenerActual()
    if (this.auth.isAuth()) {
      this.auth.goHome()
      return false
    }
      
    else if (this.auth.isAuth()) {
      this.auth.goHome()
      return false
    }
    return true
  }
}