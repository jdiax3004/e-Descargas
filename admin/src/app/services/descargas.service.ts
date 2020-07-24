import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { HttpClient } from '@angular/common/http';
import { Descarga } from '../models/descarga';

@Injectable({
  providedIn: 'root'
})
export class DescargasService extends CRUDService<Descarga>{

  constructor(private http: HttpClient) { 
    super(http, 'descargas')
  }
}
