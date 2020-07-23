import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { HttpClient } from '@angular/common/http';
import { Bitacora } from '../models/bitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService extends CRUDService<Bitacora> {

  constructor(private http: HttpClient) { 
    super(http, 'bitacora')
  }
}
