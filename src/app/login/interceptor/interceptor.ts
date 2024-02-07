//Angular imports
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
//RXJS imports
import { Observable, catchError, switchMap, throwError } from 'rxjs';
//Service
import { AuthenticationService } from 'src/app/login/service/authentication';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authToken = this.authenticationService.getToken();

    if (request.url.includes('/signin')) {
      request = this.addTokenHeader(request, authToken, 'refresh');
    } else if (authToken) {
      request = this.addTokenHeader(request, authToken);
    }

    return next.handle(request).pipe(
      catchError(errordata => {
        console.log(errordata.status);
        if (errordata.status === 403 || errordata.status === 401) {
          return this.handleRefreshToken(request, next);
        }
        return throwError(() => errordata);
      })
    );
  }

  handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.authenticationService.refreshAccessToken().pipe(
      switchMap((response) => {
        const newToken = response.access_token;
        this.authenticationService.setToken(response);
        const newRequest = this.addTokenHeader(request, newToken);
        return next.handle(newRequest);
      })
    );
  }

  addTokenHeader(request: HttpRequest<unknown>, token: string, refresh?) {
    if (refresh) {
      return request.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ZlUza2tJMVpjMWd3R2NzOTdiN2RRWUh6Z2VCUzNUSEJLd0tldlp2aDpVdUdHWE12MnFDNGViS3lLeVNSWW95MUlUSmQxZU9uNUVZWE9hcTZDbU91QVV2Y0FVSGVKcDJzdjF3VFpmWkdXeFNWcWZvUTFwd3dnTkdnWDRVRm15MEpmTTgxNFJzcHB3NExQaHJ5d0FobGVnbUxVMnhkYWtvbkZyMWtmYWJYaA=='
        }
      });
    }
    else {
      return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
  }

}