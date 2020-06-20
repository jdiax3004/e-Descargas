import { Route } from "@angular/compiler/src/core";
import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";

const ROUTES: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
