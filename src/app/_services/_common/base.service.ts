import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  baseURL: string = '';
  constructor(private httpClient: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Accept': '*/*',
      'ChannelId': '102',
      'DeviceType': '203',
      'MachineId': '12336363636647',
      'Authorization': `Bearer dfdjfldjfldjf`
    }),
  };

  get(endpoint: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.baseURL}/${endpoint}`).pipe(catchError(this.handleError));
  }

  getById(id: number, endpoint: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseURL}/${endpoint}/${id}`).pipe(catchError(this.handleError));
  }

  put(id: number, item: T, endpoint: string): Observable<T> {
    return this.httpClient.put<T>(`${this.baseURL}/${endpoint}/${id}`, item, this.httpOptions).pipe(catchError(this.handleError));
  }

  post(item: T, endpoint: string): Observable<T> {
    return this.httpClient.post<T>(`${this.baseURL}/${endpoint}`, item, this.httpOptions).pipe(catchError(this.handleError));
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${endpoint}/${id}`).pipe(catchError(this.handleError));
  }

  //Error handling
  handleError(error: any) {
    let errorMessage: any;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = Object.assign(error);
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
