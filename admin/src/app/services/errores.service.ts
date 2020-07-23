import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { HttpClient } from '@angular/common/http';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class ErroresService extends CRUDService<Error>{

  constructor(private http: HttpClient) { 
    super(http, 'errores')
  }
}
