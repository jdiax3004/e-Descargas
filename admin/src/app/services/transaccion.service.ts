import { Injectable } from "@angular/core";
import { CRUDService } from "./CRUDService";
import { HttpClient } from "@angular/common/http";
import { Transaccion } from "../models/transaccion";

@Injectable({
  providedIn: "root",
})
export class TransaccionService extends CRUDService<Transaccion> {
  constructor(private http: HttpClient) {
    super(http, "transacciones");
  }
}
