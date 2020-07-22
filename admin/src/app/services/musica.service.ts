import { Injectable } from '@angular/core';
import { CRUDService } from './CRUDService';
import { Musica } from '../models/musica';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicaService extends CRUDService<Musica> {

  constructor(private http: HttpClient) {
    super(http, '/musica')
   }
}