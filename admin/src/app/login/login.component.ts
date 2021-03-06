import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  ingresar(form: NgForm) {
    const { Usuario, Contrasenna } = form.value;
    this.auth.login(Usuario, Contrasenna);
  }

  ingresarFacebook() {
    this.auth.loginFacebook();
  }
}
