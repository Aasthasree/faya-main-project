import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  getbyId(id: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://retoolapi.dev/TMekp1/data';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getDataById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }


 
  deleteData(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  updatebyId(id:any,value:any): Observable<any>{
    let url=`${this.apiUrl}/${id}`;
    return this.http.patch(url,value).pipe((map((data) => {
      return data;})))
  }

  createUser(value:any): Observable<any>{
    return this.http.post(this.apiUrl,value).pipe((map((data)=>{
      return data;})))
  }


  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError('Something went wrong; please try again later.');
  }
}


