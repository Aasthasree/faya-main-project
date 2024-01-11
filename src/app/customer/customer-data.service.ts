import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {

  private apiUrl = 'https://retoolapi.dev/TMekp1/data';

  constructor(private http: HttpClient) { }

  // -------------Service method to fetch data from the API endpoint---------------------
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  //-------------------------Fetches a single data item from the API endpoint by its identifier--------------------
  getDataById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  //------------------- Deletes a data item from the API endpoint by its identifier.-------------------
  deleteData(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  //-------------------Updates a data item at the API endpoint by its identifier.----------------------
  updatebyId(id: any, value: any): Observable<any> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.patch(url, value).pipe((map((data) => {
      return data;
    })))
  }

  //-------------------------Creates a new data item by sending an HTTP POST request to the API endpoint.---------------
  createUser(value: any): Observable<any> {
    return this.http.post(this.apiUrl, value).pipe((map((data) => {
      return data;
    })))
  }

  //-------Handles API errors uniformly-----
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

