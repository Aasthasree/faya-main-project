//Angular imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

interface Login{
  username:  string;
  password: string;
  grant_type: string;
}

export interface LoginResponse{
  access_token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = 'https://pod6.salesonepro.com:5001';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

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

logout(){
  localStorage.clear();

}

  }