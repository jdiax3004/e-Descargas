import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { APP_ROUTES } from "./app.routes";
import { PagesModule } from "./pages/pages.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardService } from './services/login-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CommonModule } from '@angular/common';
import { ClientPagesModule } from './clientPages/client-pages.module';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NopagefoundComponent,
    PasswordRecoveryComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    ClientPagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [LoginGuardService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
