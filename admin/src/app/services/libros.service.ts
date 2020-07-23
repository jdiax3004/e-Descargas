import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService extends CRUDService<Libro> {

  constructor(private http: HttpClient) { 
    super(http, 'libro')
  }
}
