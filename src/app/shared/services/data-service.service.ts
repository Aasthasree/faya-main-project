import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {

  private apiUrl = 'https://retoolapi.dev/TMekp1/data';

  constructor(private http: HttpClient) { }

  // -------------Service method to fetch data from the API endpoint---------------------
  getData(): Observable<any[]> {
    // Making an HTTP GET request to fetch data from the API
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  //-------------------------Fetches a single data item from the API endpoint by its identifier--------------------
  getDataById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    // Making an HTTP GET request to the constructed URL
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  //------------------- Deletes a data item from the API endpoint by its identifier.-------------------
  deleteData(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    // Making an HTTP DELETE request to the constructed URL
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  //-------------------Updates a data item at the API endpoint by its identifier.----------------------
  updatebyId(id: any, value: any): Observable<any> {
    let url = `${this.apiUrl}/${id}`;
    // Making an HTTP PATCH request to the constructed URL with the provided updated data
    return this.http.patch(url, value).pipe((map((data) => {
      return data;
    })))
  }

  //-------------------------Creates a new data item by sending an HTTP POST request to the API endpoint.---------------
  createUser(value: any): Observable<any> {
    // Making an HTTP POST request to the API endpoint with the provided data
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


