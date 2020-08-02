import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  private url: string;
  
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + '/archivos'
  }

  /**
   * Uploads a file and return the url.
   * 
   * @param item file and type
   */
  subir(item: FormData): Promise<any> {
    return this.http.post(this.url, item, {
      withCredentials: true
    }).toPromise();
  }
}
