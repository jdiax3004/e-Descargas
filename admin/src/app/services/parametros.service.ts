import { Injectable } from '@angular/core';
import { Parametro } from '../models/parametro';
import { CRUDService } from './CRUDService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService extends CRUDService<Parametro> {

  constructor(private http: HttpClient) {
    super(http, 'parametros')
  }
}