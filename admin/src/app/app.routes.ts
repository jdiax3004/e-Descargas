import { Route } from "@angular/compiler/src/core";
import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { LoginGuardService as LoginGuard } from './services/login-guard.service'

const ROUTES: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "register", component: RegisterComponent, canActivate: [LoginGuard] },
  { path: "**", component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
