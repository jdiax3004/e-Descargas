import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { HttpClient } from '@angular/common/http';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService extends CRUDService<Pelicula> {

  constructor(private http: HttpClient) { 
    super(http, 'peliculas')
  }
}
