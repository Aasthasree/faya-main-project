//Angular imports
import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// RxJS imports
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//interface
import { Customer, CustomerResponse } from '../customer-model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private apiUrl = 'https://pod6.salesonepro.com:5001/api/e/customers';

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  // -------------Service method to fetch data from the API endpoint---------------------
  getCustomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(this.apiUrl).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  //-------------------------Fetches a single data item from the API endpoint by its identifier--------------------
  getCustomer(id: string): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      catchError(this.handleError.bind(this))
    );
  }

//------------------- Deletes a data item from the API endpoint by its identifier.-------------------
  deleteCustomer(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Customer>(url).pipe(
      catchError(this.handleError.bind(this))
    );
  }

//   //-------------------Updates a data item at the API endpoint by its identifier.----------------------
  updateCustomerById(id: number, value: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Customer>(url, value).pipe((map((data) => {
      return data;
    })));
  }

//   //-------------------------Creates a new data item by sending an HTTP POST request to the API endpoint.---------------
  createCustomer(value: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, value).pipe((map((data) => {
      return data;
    })));
  }

//   //-------Handles API errors uniformly-----
  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Resource not found:', error);
      this.router.navigate(['/not-found']);
      return throwError('The requested resource was not found.');
    } else if (error.status === 500) {
      console.error('Internal Server Error:', error);
      return throwError('An internal server error occurred.');
    } else {
      console.error('API Error:', error);
      return throwError('Something went wrong; please try again later.');
    }
  }

}
