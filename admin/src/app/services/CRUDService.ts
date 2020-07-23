import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class CRUDService<T> {
  constructor(private httpClient: HttpClient, private url: string) {
    this.url = `${environment.apiUrl}/${url}`
  }

  /**
   * Get all elements in database.
   */
  obtener(params?: any): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url, { params, withCredentials: true });
  }

  /**
   * Get one element.
   * @param id Id of element.
   */
  obtenerUno(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`, {
      withCredentials: true
    });
  }

  /**
   * Create a new object in database.
   * @param item Object to create.
   */
  insertar(item: T | FormData): Observable<T> {
    return this.httpClient.post<T>(this.url, item, {
      withCredentials: true
    });
  }

  /**
   * Updates an object in database.
   * @param id Id of element.
   * @param item New data of element.
   */
  modificar(item: T | FormData) {
    return this.httpClient.put(`${this.url}`, item, {
      withCredentials: true
    });
  }

  /**
   * Deletes an object in database.
   * @param id Id of element.
   */
  eliminar(id: string | number) {
    return this.httpClient.delete(`${this.url}/${id}`, {
      withCredentials: true
    });
  }
}