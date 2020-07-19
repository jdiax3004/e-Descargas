export class CRUDService<T extends any> {
  constructor(private httpClient: any, private url: string) { }

  /**
   * Get all elements in database.
   */
  find(params?: any) {
    return this.httpClient.get(this.url, { params, withCredentials: true });
  }

  /**
   * Get one element.
   * @param id Id of element.
   */
  findOne(id: string) {
    return this.httpClient.get(`${this.url}/${id}`, {
      withCredentials: true
    });
  }

  /**
   * Create a new object in database.
   * @param item Object to create.
   */
  create(item: T | FormData) {
    return this.httpClient.post(this.url, item, {
      withCredentials: true
    });
  }

  /**
   * Updates an object in database.
   * @param id Id of element.
   * @param item New data of element.
   */
  update(id: string, item: T | FormData) {
    return this.httpClient.put(`${this.url}/${id}`, item, {
      withCredentials: true
    });
  }

  /**
   * Deletes an object in database.
   * @param id Id of element.
   */
  delete(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`, {
      withCredentials: true
    });
  }
}
