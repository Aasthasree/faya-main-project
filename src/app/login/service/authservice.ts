//Angular imports
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  private currentRefreshToken: string | null;

  baseUrl: string = 'https://pod8.salesonepro.com:7001';

  constructor(
    private http: HttpClient,
    private router: Router)
    {  this.currentRefreshToken = localStorage.getItem('refresh_token');}


  // Method to refresh the access token using the refresh token
  refreshAccessToken(): Observable<any> {
    const currentRefreshTokens = localStorage.getItem('refreshtoken');
    const refreshTokenEndpoint = 'https://pod8.salesonepro.com:7001/signin/token/';

    const creds = 'grant_type=refresh_token&refresh_token='
    + currentRefreshTokens;
    return this.http.post<any>(refreshTokenEndpoint, creds).pipe(
      catchError(error => {
        console.error('Error refreshing access token:', error);
        localStorage.clear();
        this.router.navigate(['/login']);
        return throwError(error);
      })
    );
  }


   setToken(newToken): void {
    localStorage.setItem('token', newToken.access_token);
    localStorage.setItem('refreshtoken',newToken.refresh_token);
  }



login(credentials: Login): Observable<LoginResponse> {
  const baseUrl = `${this.baseUrl}/signin/token/`;
  const creds = 'grant_type=password&password='
                  + (credentials['password'])
                  + '&username='
                  + (credentials['username']);

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ZlUza2tJMVpjMWd3R2NzOTdiN2RRWUh6Z2VCUzNUSEJLd0tldlp2aDpVdUdHWE12MnFDNGViS3lLeVNSWW95MUlUSmQxZU9uNUVZWE9hcTZDbU91QVV2Y0FVSGVKcDJzdjF3VFpmWkdXeFNWcWZvUTFwd3dnTkdnWDRVRm15MEpmTTgxNFJzcHB3NExQaHJ5d0FobGVnbUxVMnhkYWtvbkZyMWtmYWJYaA=='
    })
  };

  return this.http.post<LoginResponse>(baseUrl, creds, httpOptions)

}



getToken(){
  return localStorage.getItem('token');
}



logout(): Observable<HttpResponse<any>> {
  const url = 'https://pod8.salesonepro.com:7001/signin/revoke_token/';
  const accessToken = localStorage.getItem('token');
  const creds = `token=${accessToken}`;

  return this.http.post<any>(url, creds).pipe(
    tap(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }),
    catchError(error => {
      console.error('Logout failed:', error);
      return throwError('An error occurred during logout.');
    })
  );
}
}


