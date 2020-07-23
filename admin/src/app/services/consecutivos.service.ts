import { Injectable } from "@angular/core";
import { CRUDService } from "./CRUDService";
import { Consecutivo } from "../models/consecutivo";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ConsecutivosService extends CRUDService<Consecutivo> {
  constructor(private http: HttpClient) {
    super(http, "consecutivos");
  }
}
