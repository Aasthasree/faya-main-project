//Angular imports
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS imports
import { Observable, catchError, tap, throwError } from 'rxjs';
//Model
import { Login, LoginResponse } from '../login-model/login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = 'https://pod8.salesonepro.com:7001';

  constructor(
    private http: HttpClient,
    private router: Router) { }


  refreshAccessToken(): Observable<LoginResponse> {
    const currentRefreshTokens = localStorage.getItem('refreshtoken');
    const refreshTokenEndpoint = 'https://pod8.salesonepro.com:7001/signin/token/';

    const creds = 'grant_type=refresh_token&refresh_token='
      + currentRefreshTokens;

    return this.http.post<LoginResponse>(refreshTokenEndpoint, creds).pipe(
      catchError(error => {
        console.error('Error refreshing access token:', error);
        localStorage.clear();
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  setToken(newToken: LoginResponse): void {
    localStorage.setItem('token', newToken.access_token);
    localStorage.setItem('refreshtoken', newToken.refresh_token);
  }

  login(credentials: Login): Observable<LoginResponse> {
    const baseUrl = `${this.baseUrl}/signin/token/`;
    const creds = 'grant_type=password&password='
      + (credentials['password'])
      + '&username='
      + (credentials['username']);


    return this.http.post<LoginResponse>(baseUrl, creds,).pipe(
      catchError(this.handleError.bind(this))
    );

  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout(): Observable<HttpResponse<any>> {
    const url = 'https://pod8.salesonepro.com:7001/signin/revoke_token/';
    const accessToken = localStorage.getItem('token');
    const creds = `token=${accessToken}`;

    return this.http.post<any>(url, creds).pipe(
      tap(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Resource not found:', error);
      this.router.navigate(['/admin/home']);
      return throwError(() => 'The requested resource was not found.');
    } else if (error.status === 500) {
      console.error('Internal Server Error:', error);
      return throwError(() => 'An internal server error occurred.');
    } else {
      console.error('API Error:', error);
      return throwError(() => 'Something went wrong; please try again later.');
    }
  }
}