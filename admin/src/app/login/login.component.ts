import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { environment } from "src/environments/environment";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  ingresar(form: FormGroup) {
    const { Usuario, Contrasenna } = form.value;
    this.auth.login(Usuario, Contrasenna);
  }

  ingresarFacebook() {
    this.auth.loginFacebook();
  }
}
