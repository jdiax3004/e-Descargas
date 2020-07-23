import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService extends CRUDService<any> {

  constructor(private http: HttpClient) {
    super(http, 'idiomas')
  }
}
