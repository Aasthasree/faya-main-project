//Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//interface
import { Customer } from '../customer-model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private apiUrl = 'https://retoolapi.dev/TMekp1/data';

  constructor(
    private http: HttpClient
    ) { }

  // -------------Service method to fetch data from the API endpoint---------------------
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  //-------------------------Fetches a single data item from the API endpoint by its identifier--------------------
  getCustomer(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      catchError(this.handleError)
    );
  }

  //------------------- Deletes a data item from the API endpoint by its identifier.-------------------
  deleteCustomer(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Customer>(url).pipe(
      catchError(this.handleError)
    );
  }

  //-------------------Updates a data item at the API endpoint by its identifier.----------------------
  updateCustomerById(id: number, value: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Customer>(url, value).pipe((map((data) => {
      return data;
    })));
  }

  //-------------------------Creates a new data item by sending an HTTP POST request to the API endpoint.---------------
  createCustomer(value: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, value).pipe((map((data) => {
      return data;
    })));
  }

  //-------Handles API errors uniformly-----
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError('Something went wrong; please try again later.');
  }
}


