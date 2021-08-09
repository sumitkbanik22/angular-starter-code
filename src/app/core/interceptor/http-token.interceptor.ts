import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    // const token = this.authenticationService.getToken();
    // if (token) {
    //   headersConfig['Authorization'] = `${token}`;
    // }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}

