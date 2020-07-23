import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneroPeliculaService extends CRUDService<any> {

  constructor(private http: HttpClient) {
    super(http, 'generosPelicula')
  }
}